import { responseType } from "@/constants/types/ResponseType";
import { NextFunction, Request, Response } from "express";
import { vault_zod_delete_schema } from "../zodValidations/vault.zod.delete.schema";
import { statusCode } from "@/constants/statusCodeInfo";
import VAULT_model from "../db/vault.db.model";

export const deleteLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let response: responseType;
  try {
    const data = req.body;
    const { owner_id } = req.user;
    const validatedEntry = await vault_zod_delete_schema.safeParseAsync({
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

    const deletedEntries = await VAULT_model.updateMany(
      {
        owner_id: validatedEntry.data.owner_id,
        _id: { $in: validatedEntry.data.link_ids },
      },
      {
        $set: { isExpired: true, expiresAt: new Date() },
      },
    );

    if (deletedEntries.modifiedCount === 0) {
      response = {
        success: false,
        message:
          "No vault items were deleted. Please check the provided Link IDs.",
      };
      res.status(statusCode.NOT_FOUND).json(response);
      return;
    }

    response = {
      success: true,
      message: "Vault items deleted successfully",
      payload: {
        deletedCount: deletedEntries.modifiedCount,
      },
    };

    res.status(statusCode.OK).json(response);
  } catch (error: any) {
    next(error);
  }
};
