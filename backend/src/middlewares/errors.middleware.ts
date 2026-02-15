import { statusCode } from "@/constants/statusCodeInfo";
import { responseType } from "@/constants/types/ResponseType";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction // ✅ Add this parameter
) => {
  const message = `Error occurred: ${err.message}` || "Something went wrong";

  if (process.env.NODE_ENV === "development") {
    console.log("Error occurred:", err.message);
  }

  const response: responseType = {
    success: false,
    message,
  };

  res.status(statusCode.INTERNAL_SERVER_ERROR || 500).json(response);
};
