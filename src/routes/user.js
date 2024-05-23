import express from "express";
import { authUser } from "../middlewares/auth.js";
const router = express.Router();
import {
  SIGN_UP,
  LOG_IN,
  GET_USERNAME_BY_USER_ID,
  VALIDATE_TOKEN,
} from "../controllers/user.js";

router.post("/register", SIGN_UP);
router.post("/login", LOG_IN);
router.get("/user/:userId", GET_USERNAME_BY_USER_ID);
router.get("/tokenValidation", authUser, VALIDATE_TOKEN);

export default router;
