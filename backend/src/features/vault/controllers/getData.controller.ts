import { responseType } from "@/constants/types/ResponseType";
import bcryptjs from "bcryptjs";

import { NextFunction, Request, Response } from "express";
import { vault_zod_getData_schema } from "../zodValidations/vault.zod.getData.schema";
import { statusCode } from "@/constants/statusCodeInfo";
import VAULT_model from "../db/vault.db.model";
import path from "path";

export const getDataController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let response: responseType;

  try {
    const data = req.body;
    const { token: userSendedToken } = req.params;

    const validatedData = await vault_zod_getData_schema.safeParseAsync({
      password: data.password,
      token: userSendedToken,
    });

    if (!validatedData.success) {
      return res.status(statusCode.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: validatedData.error.issues,
      });
    }

    const { token, password } = validatedData.data;
    // Step 1: Find share WITHOUT increment
    const share = await VAULT_model.findOne({
      token ,
      isExpired: false,
      expiresAt: { $gt: new Date() },
    });

    if (!share) {
      return res.status(statusCode.FORBIDDEN).json({
        success: false,
        message: "Invalid or expired link",
      });
    }

    // Step 2: Password Check (if exists)
    if (share.password) {
      if (!password) {
        return res.status(statusCode.FORBIDDEN).json({
          success: false,
          message: "Password required",
        });
      }

      const isMatch = await bcryptjs.compare(password, share.password);

      if (!isMatch) {
        return res.status(statusCode.FORBIDDEN).json({
          success: false,
          message: "Invalid password",
        });
      }
    }

    // Step 3: Atomic View Increment Check
    const updatedShare = await VAULT_model.findOneAndUpdate(
      {
        _id: share._id,
        $or: [
          { maxViews: null },
          { $expr: { $lt: ["$viewCount", "$maxViews"] } },
        ],
        isExpired: false,
      },
      { $inc: { viewCount: 1 } },
      { returnDocument: "after" },
    );

    if (!updatedShare) {
      return res.status(statusCode.FORBIDDEN).json({
        success: false,
        message: "View limit exceeded",
      });
    }

    // 🟢 TEXT case
    if (updatedShare.type === "TEXT") {
      return res.status(200).json({
        success: true,
        data: {
          type: "TEXT",
          textContent: updatedShare.textContent,
        },
      });
    }

    // 🟢 FILE case (LOCAL STORAGE)
    if (updatedShare.type === "FILE" && updatedShare.file) {
      const filePath = path.resolve(updatedShare.file.url!);

      return res.download(filePath, updatedShare.file.originalName!);
    }
  } catch (error: any) {
    next(error);
  }
};
