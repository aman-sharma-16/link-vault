import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { vault_zod_getData_schema } from "../zodValidations/vault.zod.getData.schema";
import { statusCode } from "@/constants/statusCodeInfo";
import VAULT_model from "../db/vault.db.model";
import path from "path";
import fs from "fs";

export const getDataController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token: userSendedToken } = req.params;
    const { password } = req.body;

    // 1️⃣ Validate input
    const validatedData = await vault_zod_getData_schema.safeParseAsync({
      token: userSendedToken,
      password,
    });

    if (!validatedData.success) {
      return res.status(statusCode.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: validatedData.error.issues,
      });
    }

    const { token } = validatedData.data;

    // 2️⃣ Find vault entry
    const share = await VAULT_model.findOne({
      token,
      isExpired: false,
      expiresAt: { $gt: new Date() },
    });

    if (!share) {
      return res.status(statusCode.FORBIDDEN).json({
        success: false,
        message: "Invalid or expired link",
      });
    }

    // 3️⃣ Password check
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

    // 4️⃣ Check view limit
    if (share.maxViews !== null && share.viewCount >= share.maxViews) {
      return res.status(statusCode.FORBIDDEN).json({
        success: false,
        message: "View limit exceeded",
      });
    }

    // 5️⃣ TEXT case
    if (share.type === "TEXT") {
      await VAULT_model.updateOne(
        { _id: share._id },
        { $inc: { viewCount: 1 } }
      );

      return res.status(200).json({
        success: true,
        data: {
          type: "TEXT",
          textContent: share.textContent,
        },
      });
    }

    // 6️⃣ FILE case
    if (share.type === "FILE" && share.file) {
      const normalizedPath = share.file.url.replace(/\\/g, "/");
      const filePath = path.join(process.cwd(), normalizedPath);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "File not found",
        });
      }

      return res.download(filePath, share.file.originalName!, async (err) => {
        if (!err) {
          await VAULT_model.updateOne(
            { _id: share._id },
            { $inc: { viewCount: 1 } }
          );
        }
      });
    }

    return res.status(500).json({
      success: false,
      message: "Invalid vault data",
    });

  } catch (error) {
    next(error);
  }
};