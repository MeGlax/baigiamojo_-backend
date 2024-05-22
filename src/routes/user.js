import express from "express";
const router = express.Router();
import { SIGN_UP, LOG_IN } from "../controllers/user.js";

router.post("/register", SIGN_UP);
router.post("/login", LOG_IN);

export default router;
