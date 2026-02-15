import mongoose from "mongoose";
import user_db_schema from "./user.db.schema";

export const USER_model =
  mongoose.models.user || mongoose.model("user", user_db_schema);
