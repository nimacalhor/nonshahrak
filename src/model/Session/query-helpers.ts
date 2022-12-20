import { TContext } from "@t/general-types";
import { SessionDoc } from "@t/session";
import { getUserByIdQHelper } from "../query-helper-factory";
import { Query } from "mongoose";
import { getUserId } from "@src/lib/helper/bot";

export const byUserId = getUserByIdQHelper<SessionDoc>();
export const byCtx = function (
  this: Query<SessionDoc[] | SessionDoc, SessionDoc>,
  ctx: TContext
): Query<SessionDoc | null, SessionDoc> {
  const query = this.findOne({ userId: getUserId(ctx) });
  return query;
};
