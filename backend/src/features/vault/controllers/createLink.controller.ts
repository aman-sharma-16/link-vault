import { NextFunction, Request, Response } from "express";
import { responseType } from "../../../constants/types/ResponseType";
import { vault_zod_post_schema } from "../zodValidations/vault.zod.post.schema";
import { statusCode } from "../../../constants/statusCodeInfo";
import VAULT_model from "../db/vault.db.model";
import { generateToken } from "@/utils/token";
import bcryptjs from "bcryptjs";

export const vaultPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let response: responseType;
  try {
    const data = req.body;
    const { owner_id } = req.user;
    const validatedEntry = await vault_zod_post_schema.safeParseAsync({
      ...data,
      owner_id,
    });

    if (!validatedEntry.success) {
      response = {
        success: false,
        message: validatedEntry.error.issues,
      };
      res.status(statusCode.UNPROCESSABLE_ENTITY).json(response);
      return;
    }

    const token = generateToken();
    const hashedPassword = validatedEntry.data.password
      ? await bcryptjs.hash(validatedEntry.data.password, 10)
      : undefined;

    const savedEntry = new VAULT_model({
      owner_id: validatedEntry.data.owner_id,
      token,
      type: validatedEntry.data.type,
      textContent: validatedEntry.data.textContent,
      file: {
        url: req.file ? req.file.path : undefined,
        originalName: req.file ? req.file.originalname : undefined,
        mimeType: req.file ? req.file.mimetype : undefined,
        size: req.file ? req.file.size : undefined,
      },
      expiresAt: new Date(
        Date.now() + (validatedEntry.data.expiresAt! * 60 || 10 * 60) * 1000,
      ),
      password: hashedPassword,
      maxViews: validatedEntry.data.maxViews,
    });

    await savedEntry.save();

    response = {
      success: true,
      message: "Vault item created successfully",
      payload: {
        token,
      },
    };

    res.status(statusCode.CREATED).json(response);
  } catch (error: any) {
    next(error);
  }
};
