import { calendarEventZodSchemaType } from "@/features/calendar_events/zodValidation/calendar_event.zod.schema";
import { chatZodSchemaType } from "@/features/chats/zodValidation/chat.zod.schema";
import { memberZodSchemaType } from "@/features/permissions/zodValidation/member.zod.schema";
import { projectZodSchemaType } from "@/features/projects/zodValidation/project.zod.schema.";
import { threadZodSchemaType } from "@/features/threads/zodValidation/thread.zod.schema";
import { ZodError } from "zod";

export type ZodReturnType = {
  success: true | false;
  message: string | ZodError;
  payload?:
    | chatZodSchemaType
    | memberZodSchemaType
    | projectZodSchemaType
    | threadZodSchemaType
    | calendarEventZodSchemaType;
};
