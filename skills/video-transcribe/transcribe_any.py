"""ถอดเสียงคลิปด้วยเจ้าที่เลือกได้ แล้วเขียนไฟล์รูปแบบ ElevenLabs Scribe ให้ video-use ใช้ต่อ

video-use cache transcript ต่อไฟล์ (edit/transcripts/<ชื่อ>.json) — ไฟล์มีอยู่แล้วมันไม่เรียก ElevenLabs
เลยเสียบเจ้าอื่นแทนได้โดยไม่ต้องแก้โค้ดของเขา · ใช้ helper ของ video-use เอง (ชื่อไฟล์/ดึงเสียง) กันเพี้ยน

    python transcribe_any.py <คลิปหรือโฟลเดอร์> [--engine local|openai|google|elevenlabs] [--language th]
    ค่าเริ่มต้น engine = $TRANSCRIBE_ENGINE หรือ local (faster-whisper บนเครื่อง ฟรี)

รูปแบบที่เขียน: {"language_code", "text", "words": [{text, start, end, type: word|spacing|audio_event, speaker_id}]}
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import tempfile
import time
from pathlib import Path

VIDEO_USE = Path(os.environ.get("VIDEO_USE_DIR", Path.home() / ".claude" / "skills" / "video-use"))
sys.path.insert(0, str(VIDEO_USE / "helpers"))
from transcribe import count_audio_tracks, extract_audio, peak_dbfs, transcript_path  # noqa: E402

VIDEO_EXTS = {".mp4", ".mov", ".mkv", ".avi", ".m4v", ".webm", ".wav", ".mp3", ".m4a"}
Word = dict  # {text, start, end}


# ── เจ้าถอดเสียง: รับไฟล์ wav 16k mono → คืนรายการคำ (เวลาเป็นวินาที) ─────────────

def engine_local(wav: Path, language: str | None) -> list[Word]:
    """faster-whisper บนเครื่อง · GPU ถ้ามี ไม่งั้น CPU · โมเดลตั้งด้วย $WHISPER_MODEL (ค่าเริ่ม large-v3)"""
    _cuda_dlls()
    from faster_whisper import WhisperModel

    name = os.environ.get("WHISPER_MODEL", "large-v3")
    try:
        model = WhisperModel(name, device="cuda", compute_type="float16")  # large-v3 fp16 ≈ 4.5GB พอดี RTX 4050 6GB
    except Exception as e:  # ไม่มี CUDA / DLL ไม่ครบ → CPU ช้ากว่าแต่ได้ผลเท่ากัน
        print(f"  cuda ใช้ไม่ได้ ({str(e)[:80]}) → cpu", flush=True)
        model = WhisperModel(name, device="cpu", compute_type="int8")
    # vad_filter=False: ให้ช่วงเงียบอยู่ครบ video-use ใช้ช่องว่างเป็นจุดตัด
    # ห้ามใส่ initial_prompt คำเติม — ทดลองแล้วชักนำให้หลอนวน "นะ นะ นะ" (2026-09-25)
    # condition_on_previous_text=False กันหลอนลามข้ามช่วง
    segments, _ = model.transcribe(
        str(wav), language=language, word_timestamps=True, vad_filter=False,
        condition_on_previous_text=False,
    )
    return [{"text": w.word.strip(), "start": w.start, "end": w.end}
            for s in segments for w in (s.words or []) if w.word.strip()]


def engine_openai(wav: Path, language: str | None) -> list[Word]:
    """OpenAI whisper-1 · ต้องมี OPENAI_API_KEY · ไฟล์ ≤ 25MB (wav 16k ≈ 13 นาที)"""
    from openai import OpenAI

    with open(wav, "rb") as f:
        r = OpenAI().audio.transcriptions.create(
            model="whisper-1", file=f, language=language, response_format="verbose_json",
            timestamp_granularities=["word"],
        )
    return [{"text": w.word.strip(), "start": w.start, "end": w.end} for w in (r.words or [])]


def engine_google(wav: Path, language: str | None) -> list[Word]:
    """Google Cloud Speech v1 · ต้องมี GOOGLE_APPLICATION_CREDENTIALS
    ponytail: recognize แบบ sync รับเสียง ≤ 1 นาที · ยาวกว่านั้นต้องอัป GCS + long_running_recognize"""
    from google.cloud import speech

    cfg = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16, sample_rate_hertz=16000,
        language_code={"th": "th-TH", "en": "en-US"}.get(language or "th", language),
        enable_word_time_offsets=True,
    )
    r = speech.SpeechClient().recognize(config=cfg, audio=speech.RecognitionAudio(content=wav.read_bytes()))
    return [{"text": w.word, "start": w.start_time.total_seconds(), "end": w.end_time.total_seconds()}
            for res in r.results for w in res.alternatives[0].words]


def engine_elevenlabs(wav: Path, language: str | None) -> dict:
    """ของเดิม video-use · คืน payload Scribe ตรงๆ (มีแยกผู้พูด + audio event ครบอยู่แล้ว)"""
    from transcribe import call_scribe, load_api_key

    return call_scribe(wav, load_api_key(), language, None)


ENGINES = {"local": engine_local, "openai": engine_openai, "google": engine_google, "elevenlabs": engine_elevenlabs}


# ── แปลงเป็นรูปแบบ Scribe ──────────────────────────────────────────────────────

def to_scribe(words: list[Word], language: str | None) -> dict:
    """ใส่ spacing ระหว่างคำทุกคู่ — pack_transcripts ใช้ spacing หาช่วงเงียบสำหรับตัด"""
    out: list[dict] = []
    for i, w in enumerate(words):
        if i and w["start"] > words[i - 1]["end"]:
            out.append({"text": " ", "start": words[i - 1]["end"], "end": w["start"],
                        "type": "spacing", "speaker_id": "speaker_0"})
        out.append({**w, "type": "word", "speaker_id": "speaker_0"})  # ponytail: ไม่แยกผู้พูด (คลิปคนเดียว)
    return {"language_code": language, "text": " ".join(w["text"] for w in words), "words": out}


def transcribe_one(video: Path, edit_dir: Path, engine: str, language: str | None, track: int) -> Path:
    out = transcript_path(edit_dir, video, track)
    if out.exists():
        print(f"cached: {out.name}")
        return out
    out.parent.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / f"{video.stem}.wav"
        extract_audio(video, wav, track)
        if peak_dbfs(wav) < -60.0:
            n = count_audio_tracks(video)
            raise RuntimeError(f"{video.name} track {track + 1} เงียบสนิท" + (f" · มี {n} แทร็ก ลอง --audio-track" if n > 1 else ""))
        print(f"  {engine}: {video.name}", flush=True)
        result = ENGINES[engine](wav, language)
    payload = result if isinstance(result, dict) else to_scribe(result, language)
    # ensure_ascii (ค่าเริ่ม) = ไทยเป็น \uXXXX · pack_transcripts อ่านด้วย read_text() ไม่ระบุ encoding
    # บน Windows จะถอดเป็น cp1252 → ไทยเพี้ยน (เจอจริง 2026-09-25) · ASCII ล้วนปลอดภัยทุกเครื่อง
    out.write_text(json.dumps(payload, indent=2))
    print(f"  saved {out.name} · {sum(w['type'] == 'word' for w in payload['words'])} คำ · {time.time() - t0:.1f}s")
    return out


def _cuda_dlls() -> None:
    """Windows: DLL ของ cuBLAS/cuDNN จาก pip (nvidia-*) ไม่อยู่ใน PATH — ctranslate2 หาไม่เจอถ้าไม่เพิ่มเอง"""
    if os.name != "nt":
        return
    import site

    for base in site.getsitepackages() + [site.getusersitepackages()]:
        for b in Path(base, "nvidia").glob("*/bin"):
            os.add_dll_directory(str(b))
            os.environ["PATH"] = f"{b}{os.pathsep}{os.environ['PATH']}"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("source", type=Path, help="คลิปเดียว หรือโฟลเดอร์คลิป")
    ap.add_argument("--engine", choices=ENGINES, default=os.environ.get("TRANSCRIBE_ENGINE", "local"))
    ap.add_argument("--language", default="th", help="รหัสภาษา เช่น th, en (ค่าเริ่ม th)")
    ap.add_argument("--edit-dir", type=Path, default=None, help="ค่าเริ่ม <โฟลเดอร์คลิป>/edit")
    ap.add_argument("--audio-track", type=int, default=0)
    a = ap.parse_args()

    src = a.source.resolve()
    videos = sorted(p for p in src.iterdir() if p.suffix.lower() in VIDEO_EXTS) if src.is_dir() else [src]
    edit_dir = (a.edit_dir or (src if src.is_dir() else src.parent) / "edit").resolve()
    if not videos:
        sys.exit(f"ไม่เจอคลิปใน {src}")
    for v in videos:  # ponytail: ทีละไฟล์ · GPU ตัวเดียวรันขนานไม่ได้เร็วขึ้น
        transcribe_one(v, edit_dir, a.engine, a.language, a.audio_track)


if __name__ == "__main__":
    main()
