import questionModel from "../models/question.js";
import { v4 as uuidv4 } from "uuid";

const POST_QUESTION = async (req, res) => {
  const date = new Date();
  try {
    const question = new questionModel({
      user_id: req.body.user_id,
      question_text: req.body.question_text,
      date: date,
      answers: [],
    });
    question.id = question._id.toString();
    const response = await question.save();
    return res
      .status(201)
      .json({ status: "Question was added", response: response });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_QUESTIONS = async (req, res) => {
  try {
    const questions = await questionModel.find();
    return res.json({ questions: questions });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened xd" });
  }
};

const DELETE_QUESTION = async (req, res) => {
  try {
    const question = await questionModel.findById(req.params.questionId);
    if (req.body.user_id !== question.user_id) {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete this question" });
    }
    const deleteQuestion = await questionModel.findByIdAndDelete(
      req.params.questionId
    );
    return res.status(200).json({
      message: "Question deleted successfully",
      deleted_question: deleteQuestion,
    });
    // const question = await questionModel.findByIdAndDelete(req.params.id);
    // return res.status(200).json({ question: question });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened xd" });
  }
};

const ANSWER_QUESTION = async (req, res) => {
  try {
    const newId = uuidv4();
    const questionId = req.params.questionId;
    const answer = req.body.answer;
    const user_id = req.body.user_id;
    const date = new Date();
    const newAnswer = {
      id: newId,
      answer: answer,
      date: date,
      user_id: user_id,
      liked_by: [],
    };
    const question = await questionModel.updateOne(
      { _id: questionId },
      { $push: { answers: newAnswer } }
    );
    return res.status(200).json({
      message: "answer posted successfully",
      response: question,
    });
  } catch (err) {
    console.error("Error handled:", err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

const DELETE_ANSWER = async (req, res) => {
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  try {
    const question = await questionModel.findById(questionId);
    const targetedAnswer = question.answers.find(
      (answer) => answer.id === answerId
    );
    if (!targetedAnswer) {
      return res.status(404).json({ status: "answer not found" });
    }
    if (targetedAnswer.user_id !== req.body.user_id) {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete this answer" });
    }
    const filteredAnswers = question.answers.filter(
      (answer) => answer.id !== answerId
    );
    const updatedAnswers = await questionModel.updateOne(
      { _id: questionId },
      { answers: filteredAnswers }
    );
    return res.json({ message: "answer deleted", update: updatedAnswers });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened xd" });
  }
};
const FAVORITE = async (req, res) => {
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;
  const user_id = req.body.user_id;
  try {
    const question = await questionModel.findById(questionId);
    const targetedAnswerId = question.answers.findIndex(
      (answer) => answer.id === answerId
    );
    const targetedAnswer = question.answers[targetedAnswerId];
    if (!targetedAnswer) {
      return res.status(404).json({ status: "answer not found" });
    }
    const favorites = targetedAnswer.liked_by;
    const isFavorited = favorites.some((person) => {
      return person === user_id;
    });

    if (isFavorited) {
      const newFavorites = favorites.filter((favorite) => {
        return favorite !== user_id;
      });

      question.answers[targetedAnswerId].liked_by = newFavorites;

      const updatedFavorites = await questionModel.updateOne(
        { _id: questionId },
        { $set: { [`answers.${targetedAnswerId}.liked_by`]: newFavorites } }
      );
      return res.json({
        message: "unliked successfully",
        response: updatedFavorites,
      });
    } else if (!isFavorited) {
      const newFavorites = [...favorites, user_id];

      question.answers[targetedAnswerId].liked_by = newFavorites;
      const updatedFavorites = await questionModel.updateOne(
        { _id: questionId },
        { $set: { [`answers.${targetedAnswerId}.liked_by`]: newFavorites } }
      );
      return res.json({
        message: "liked successfully",
        response: updatedFavorites,
      });
    } else return res.status(500).json({ message: "Something's not right" });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened xd" });
  }
};
const GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await questionModel.findById(req.params.questionId);
    return res.status(200).json({ question: question });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened xd" });
  }
};

export {
  GET_QUESTIONS,
  POST_QUESTION,
  DELETE_QUESTION,
  ANSWER_QUESTION,
  DELETE_ANSWER,
  FAVORITE,
  GET_QUESTION_BY_ID,
};
