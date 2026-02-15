import { Router } from "express";
import { loginController } from "./controllers/login.controller";
import { signupController } from "./controllers/signup.controller";

export const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/signup", signupController);
