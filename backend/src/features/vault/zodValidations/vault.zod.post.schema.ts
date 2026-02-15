import { z } from "zod";

export const vault_zod_post_schema = z.object({
  owner_id: z.string().nonempty("Owner ID is required"),
  type: z.enum(["TEXT", "FILE"], {
    message: "Type must be either 'TEXT' or 'FILE'",
  }),
  textContent: z
    .string()
    .nonempty("Text content cannot be empty")
    .max(1024, "Text content must be less than 1024 characters")
    .optional(),
  file: z
    .object({
      url: z.string().nonempty("File URL is required").optional(),
      originalName: z
        .string()
        .nonempty("File original name is required")
        .optional(),
      mimeType: z.string().nonempty("File MIME type is required").optional(),
      size: z.number().nonnegative("File size is required").optional(),
    })
    .optional(),
  expiresAt: z.coerce.number().positive().optional(),
  password: z.string().optional(),
  maxViews: z.coerce.number().int().positive().optional(),
});
