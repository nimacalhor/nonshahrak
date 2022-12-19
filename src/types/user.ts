import {
  HydratedDocument,
  Model,
  ObjectId,
  Query,
  QueryWithHelpers,
} from "mongoose";

export interface User {
  name: string;
  userId: number;
  phone: string;
  block: number;
  entrance: number | "loneEntrance";
  floor: number;
  unit: number;
  username: string | undefined;
  _id: ObjectId;
}

export type UserDoc = HydratedDocument<User>;
export interface UserQueryHelpers {
  byUserId(
    this: Query<any, UserDoc>,
    userId: number | undefined
  ): QueryWithHelpers<User | null, UserDoc, UserQueryHelpers>;
}
export type UserModel = Model<User, UserQueryHelpers>;
export type UserQuery = QueryWithHelpers<any, UserDoc, UserQueryHelpers>;
