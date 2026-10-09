# ตัวเช็กเดียวของ to_scribe — spacing ต้องครบทุกช่องว่าง ไม่งั้น video-use หาจุดตัดจากความเงียบไม่เจอ
# รัน: python check_to_scribe.py  (ต้องมี video-use ที่ ~/.claude/skills/video-use หรือ $VIDEO_USE_DIR)
from transcribe_any import to_scribe

p = to_scribe([{"text": "สวัสดี", "start": 0.0, "end": 0.6},
               {"text": "ครับ", "start": 0.6, "end": 0.9},     # ติดกัน → ไม่มี spacing
               {"text": "เอ่อ", "start": 2.4, "end": 2.7}], "th")  # เว้น 1.5 วิ → ต้องมี spacing
types = [w["type"] for w in p["words"]]
assert types == ["word", "word", "spacing", "word"], types
gap = p["words"][2]
assert (gap["start"], gap["end"]) == (0.9, 2.4), gap
assert all(w["speaker_id"] == "speaker_0" for w in p["words"])
assert p["language_code"] == "th" and p["text"] == "สวัสดี ครับ เอ่อ"

# ต่อเข้า pack_transcripts ของ video-use ได้จริง: ช่องว่าง ≥ 0.5 วิ ต้องแตกเป็น 2 วลี
from pack_transcripts import group_into_phrases
phrases = group_into_phrases(p["words"], 0.5)
assert [ph["text"] for ph in phrases] == ["สวัสดี ครับ", "เอ่อ"], phrases
print("ok")
