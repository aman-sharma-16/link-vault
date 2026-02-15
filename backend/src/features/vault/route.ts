import { Router } from "express";
import { vaultPostController } from "./controllers/createLink.controller";
import { uploader } from "@/middlewares/uploader.middleware";
import { getDataController } from "./controllers/getData.controller";
import { deleteLinkController } from "./controllers/deleteLink.controller";
import { statusCode } from "@/constants/statusCodeInfo";
import multer from "multer";
import { authenticate } from "@/middlewares/auth.middlware";
import { getAllLinkController } from "./controllers/getAllLink.controller";

export const vaultRouter = Router();

vaultRouter.post(
  "/",
  authenticate,
  (req, res, next) => {
    uploader.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(statusCode.BAD_REQUEST).json({
          success: false,
          message: err.message,
        });
      }

      if (err) {
        return res.status(statusCode.BAD_REQUEST).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  },
  vaultPostController
);

vaultRouter.post("/data/:token", getDataController);
vaultRouter.get("/data", authenticate, getAllLinkController);

vaultRouter.patch(
  "/",
  authenticate,
  deleteLinkController
);

