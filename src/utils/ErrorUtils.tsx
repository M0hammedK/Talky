import { ZodError } from "zod";

export const ZodErrorToString = (err: ZodError) => {
  return err.issues.map((error) => error.message).join("\n");
};
