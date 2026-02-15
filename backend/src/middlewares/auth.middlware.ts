import { statusCode } from "@/constants/statusCodeInfo";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(statusCode.UNAUTHORISED)
      .json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Attach user info to request
    req.user = decoded as { owner_id: string };

    next();
  } catch (err) {
    return res
      .status(statusCode.UNAUTHORISED)
      .json({ message: "Invalid token" });
  }
};
