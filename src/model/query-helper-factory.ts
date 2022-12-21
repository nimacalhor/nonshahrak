import { Query } from "mongoose";

export const getUserByIdQHelper = function <
  TDoc extends {},
  TResult = TDoc | null
>() {
  return function (
    this: Query<TDoc[] | TDoc, TDoc>,
    userId: number | undefined
  ): Query<TResult, TDoc> {
    const query = this.find({ userId });
    return query as Query<TResult, TDoc>;
  };
};
