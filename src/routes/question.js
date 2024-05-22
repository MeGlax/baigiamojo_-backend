import express from "express";
import { authUser } from "../middlewares/auth.js";
import {
  GET_QUESTIONS,
  POST_QUESTION,
  DELETE_QUESTION,
  ANSWER_QUESTION,
  DELETE_ANSWER,
  LIKE_ANSWER,
  UNLIKE_ANSWER,
} from "../controllers/question.js";

const router = express.Router();

router.post("/question", authUser, POST_QUESTION);
router.get("/questions", GET_QUESTIONS);
router.delete("/question/:questionId", authUser, DELETE_QUESTION);
router.post("/question/:questionId/answer", authUser, ANSWER_QUESTION);
router.delete("/question/:questionId/:answerId", authUser, DELETE_ANSWER);
router.post("/like/:questionId/:answerId/", authUser, LIKE_ANSWER);
router.delete("/like/:questionId/:answerId/", authUser, UNLIKE_ANSWER);
export default router;
