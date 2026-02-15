import mongoose from "mongoose";
import vault_db_schema from "./vault.db.schema";

const VAULT_model =
  mongoose.models.vault || mongoose.model("vault", vault_db_schema);

export default VAULT_model;
