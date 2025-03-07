import { z } from "zod";
import AuthorSchema, { AuthorZodSchema } from "./authorSchema";
import CommentSchema from "./commentSchema";
import ReactionSchema from "./reactionSchema";

export const postSchema = z.object({
  id: z.number().optional(),
  content: z.string(),
  title: z.string(),
  imagePath: z.string(),
  authorId: z.number(),
  createdAt: z.string(),
  author: AuthorZodSchema.optional(),
  comments: z.array(z.any()).optional(),
  reactions: z.array(z.any()).optional(),
});

class PostSchema {
  public id?: number;
  public content: string;
  public title: string;
  public imagePath: string;
  public authorId: number;
  public createdAt: string;
  public author?: AuthorSchema;
  public comments?: CommentSchema[];
  public reactions?: ReactionSchema[];

  constructor(data: any) {
    const parsed = postSchema.parse(data);
    this.id = parsed.id;
    this.content = parsed.content;
    this.title = parsed.title;
    this.imagePath = parsed.imagePath;
    this.authorId = parsed.authorId;
    this.createdAt = parsed.createdAt;
    this.author = parsed.author;
    this.comments = parsed.comments;
    this.reactions = parsed.reactions;
  }
}

export default PostSchema;
