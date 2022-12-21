import { Query } from "mongoose";

export const getUserByIdQHelper = function <TDoc extends {}>() {
  return function (
    this: Query<TDoc[] | TDoc, TDoc>,
    userId: number | undefined
  ): Query<TDoc | null, TDoc> {
    const query = this.findOne({ userId });
    return query;
  };
};
