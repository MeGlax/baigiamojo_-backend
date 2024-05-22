import mongoose from "mongoose";
import { emailRegexValidation } from "../helpers/regex.js";

const validateEmail = function (email) {
  return emailRegexValidation.test(email);
};

const userSchema = mongoose.Schema({
  id: { type: String, required: true, min: 3 },
  name: { type: String, required: true, min: 3 },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [emailRegexValidation, "Please fill a valid email address"],
  },
  password: { type: String, required: true, min: 3 },
});
export default mongoose.model("user", userSchema); // per čia pasivadina duombazes collection(rašyt vienaskaitą, nes automatiškai prideda "s" and galo)
