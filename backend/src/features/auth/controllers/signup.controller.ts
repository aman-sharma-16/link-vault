import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { statusCode } from "@/constants/statusCodeInfo";
import { USER_model } from "../db/user.model";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // 🔹 Basic validation
    if (!username || !email || !password) {
      return res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    // 🔹 Check if username already exists
    const existingUsername = await USER_model.findOne({ username });
    if (existingUsername) {
      return res.status(statusCode.FORBIDDEN).json({
        success: false,
        message: "Username already taken",
      });
    }

    // 🔹 Check if email already exists
    const existingEmail = await USER_model.findOne({ email });
    if (existingEmail) {
      return res.status(statusCode.FORBIDDEN).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 🔹 Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 🔹 Create user
    const newUser = await USER_model.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(statusCode.CREATED).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (error: any) {
    console.error("Signup error:", error);

    // 🔥 Handle duplicate key error (safety net)
    if (error.code === 11000) {
      return res.status(statusCode.FORBIDDEN).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};
