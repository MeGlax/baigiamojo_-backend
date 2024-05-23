import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt); // pagal salt'ą ir duotą password'ą encrypt'intas passwordas
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    user.id = user._id.toString();
    const response = await user.save();
    return res
      .status(201)
      .json({ status: "User was created", response: response });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "wrong user data" });
  }
};

const LOG_IN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    // userModel nurodo kokiame collection'e ieškom
    if (!user) {
      return res.status(500).json({ message: "Login unsuccessful" });
    }
    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(500).json({ message: "Login unsuccessful" });
    }
    const jwt_token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    // - čia paduodam email'ą ir id, bei slaptažodį, per kury encryptinam
    return res.json({
      jwt_token: jwt_token,
      user_id: user.id,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened xd" });
  }
};
const GET_USERNAME_BY_USER_ID = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    return res.status(200).json({ username: user.name });
  } catch (err) {
    console.log("handled error: ", err);
    return res
      .status(404)
      .json({ message: "User with such id does not exist" });
  }
};
const VALIDATE_TOKEN = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.user_id);
    return res.status(200).json({ user: user });
  } catch (err) {
    console.log("handled error: ", err);
    return res
      .status(404)
      .json({ message: "User with such id does not exist" });
  }
};

export { SIGN_UP, LOG_IN, GET_USERNAME_BY_USER_ID, VALIDATE_TOKEN };
