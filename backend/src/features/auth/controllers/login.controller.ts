import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { USER_model } from "../db/user.model";
import { statusCode } from "@/constants/statusCodeInfo";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const user = await USER_model.findOne({ username });

    if (!user) {
      return res.status(statusCode.UNAUTHORISED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(statusCode.UNAUTHORISED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔐 Generate JWT (only userId)
    const token = jwt.sign(
      { owner_id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(statusCode.OK).json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error: any) {
    next(error);
  }
};
