import AuthorSchema from "./authorSchema";

class CommentSchema {
  public id?: number;
  public content!: string;
  public user!: AuthorSchema;

  constructor(data: any) {
    this.id = data.id;
    this.content = data.content;
    this.user = new AuthorSchema(data.user);
  }
}

export default CommentSchema;
