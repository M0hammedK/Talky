import { z } from "zod";

// Define the Zod schema for validation
export const AuthorZodSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});

// Define the TypeScript class
class AuthorSchema {
  public id?: number;
  public name!: string;

  constructor(data: any) {
    const parsed = AuthorZodSchema.parse(data);
    this.id = parsed.id;
    this.name = parsed.name;
  }
}

export default AuthorSchema;
