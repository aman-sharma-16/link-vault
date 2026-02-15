import { z } from "zod";

export const vault_zod_getData_schema = z.object({
  token: z.string().nonempty("Token is required"),
  password: z.string().optional(),
});
