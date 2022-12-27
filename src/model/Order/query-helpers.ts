import { getTomorrowsDate } from "@src/lib/helper/date-helper";
import { OrderDoc } from "@src/types/order";
import { OrderQueryHelpers } from "@src/types/session";
import { Query, QueryWithHelpers } from "mongoose";

type ThisType = Query<OrderDoc[], OrderDoc, OrderQueryHelpers>;
type ReturnType = QueryWithHelpers<OrderDoc[], OrderDoc, OrderQueryHelpers>;

export const tomorrows = function (this: ThisType): ReturnType {
  const tomorrowsDate = getTomorrowsDate();
  const tomorrowsDay = tomorrowsDate.getDate();
  const month = tomorrowsDate.getMonth();
  const query = this.find({
    day: tomorrowsDay,
    month,
  });
  return query;
};

export const byUserId = function (
  this: ThisType,
  userId: number | undefined
): ReturnType {
  const query = this.find({ userId });
  return query;
};
