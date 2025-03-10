import { z } from "zod";
import AuthorSchema, { AuthorZodSchema } from "./authorSchema";
import CommentSchema from "./commentSchema";

export const postSchema = z.object({
  id: z.number().optional(),
  content: z.string(),
  title: z.string(),
  authorId: z.number(),
  createdAt: z.string(),
  author: AuthorZodSchema.optional(),
  comments: z.array(z.any()).optional(),
});

class PostSchema {
  public id?: number;
  public content: string;
  public title: string;
  public authorId: number;
  public createdAt: string;
  public author?: AuthorSchema;
  public comments?: CommentSchema[];

  constructor(data: any) {
    const parsed = postSchema.parse(data);
    this.id = parsed.id;
    this.content = parsed.content;
    this.title = parsed.title;
    this.authorId = parsed.authorId;
    this.createdAt = parsed.createdAt;
    this.author = parsed.author;
    this.comments = parsed.comments;
  }
}

export default PostSchema;
