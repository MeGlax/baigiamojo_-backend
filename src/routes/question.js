import express from "express";
import { authUser } from "../middlewares/auth.js";
import {
  GET_QUESTIONS,
  POST_QUESTION,
  DELETE_QUESTION,
  ANSWER_QUESTION,
  DELETE_ANSWER,
  FAVORITE,
  GET_QUESTION_BY_ID,
} from "../controllers/question.js";

const router = express.Router();

router.post("/question", authUser, POST_QUESTION);
router.get("/questions", GET_QUESTIONS);
router.delete("/question/:questionId", authUser, DELETE_QUESTION);
router.post("/question/:questionId/answer", authUser, ANSWER_QUESTION);
router.delete(
  "/question/:questionId/answer/:answerId",
  authUser,
  DELETE_ANSWER
);
router.put(
  "/favorite/question/:questionId/answer/:answerId",
  authUser,
  FAVORITE
);
router.get("/question/:questionId", GET_QUESTION_BY_ID);
export default router;
