import "express";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      owner_id: string;
    };
  }
}
