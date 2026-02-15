import { z } from "zod";

export type responseType = {
  success: boolean;
  message: string | z.ZodIssue[];
  payload?: any;
};
