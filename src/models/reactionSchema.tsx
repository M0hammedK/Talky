class ReactionSchema {
  public id?: number;
  public type!: string;
  public userId!: number;

  constructor(data: any) {
    this.id = data.id;
    this.type = data.type;
    this.userId = data.userId;
  }
}

export default ReactionSchema;
