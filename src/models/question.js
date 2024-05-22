import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true, min: 3 },
  user_id: { type: String, required: true },
  question_text: { type: String, required: true, min: 3 },
  date: { type: String, required: true, min: 3 },
  answers: { type: Array, required: true, min: 1 },
});
export default mongoose.model("question", questionSchema);
