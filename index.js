import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import cors from "cors";
import questionRouter from "./src/routes/question.js";
import userRouter from "./src/routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(questionRouter);
app.use(userRouter);

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => {
    console.log("err: ", err);
  });

app.listen(process.env.PORT);
