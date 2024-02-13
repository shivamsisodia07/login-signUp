import { Router } from "express";
import {
  RegisterUser,
  LoginUser,
  LogOutUser,
  refreshAccessToken,
} from "../controllers/user.js";
import { verifyJwt } from "../middlewares/auth.js";
const userRouter = Router();

userRouter.route("/register").post(RegisterUser);
userRouter.route("/login").post(LoginUser);
userRouter.route("/logout").post(verifyJwt, LogOutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);

export default userRouter;
