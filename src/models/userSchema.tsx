import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "USER"]).default("USER"),
  password: z.string().min(6, "Password most contains at least 6 characters"),
  profileImg: z.string(),
});

class UserSchema {
  public id?: number;
  public name: string;
  public email: string;
  public role: string;
  public password: string;
  public profileImg: string;

  constructor(data: any) {
    const parsed = userSchema.parse(data);
    this.id = parsed.id;
    this.name = parsed.name;
    this.email = parsed.email;
    this.role = parsed.role;
    this.password = parsed.password;
    this.profileImg = parsed.profileImg;
  }
}

export default UserSchema;
