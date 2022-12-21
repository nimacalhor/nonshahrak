import { Query, QueryWithHelpers } from "mongoose";
import { UserDoc, User, UserQueryHelpers, UserQuery } from "@t/user";

export const byUserId = function (
  this: UserQuery,
  userId: number | undefined
): QueryWithHelpers<UserDoc | null, UserDoc, UserQueryHelpers> {
  const query = this.findOne({ userId });
  return query;
};
