import { responseType } from "@/constants/types/ResponseType";
import { NextFunction, Request, response, Response } from "express";
import VAULT_model from "../db/vault.db.model";
import { statusCode } from "@/constants/statusCodeInfo";

export const getAllLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let response: responseType;

  try {
    const { owner_id } = req.user;

    const links = await VAULT_model.find({
      owner_id: owner_id,
      isExpired: false,
    });

    if (!links || links.length === 0) {
      response = {
        success: false,
        message: "No vault items found for the specified owner.",
      };
      res.status(statusCode.NOT_FOUND).json(response);
      return;
    }

    response = {
      success: true,
      message: "Vault items retrieved successfully",
      payload: links,
    };

    res.status(statusCode.OK).json(response);
  } catch (error: any) {
    next(error);
  }
};
