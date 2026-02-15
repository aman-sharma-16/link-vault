import { z } from "zod";

export const vault_zod_delete_schema = z.object({
  owner_id: z.string().nonempty("Owner ID is required"),
  link_ids: z
    .array(z.string().nonempty("Link ID cannot be empty"))
    .min(1, "At least one Link ID is required"),
});
