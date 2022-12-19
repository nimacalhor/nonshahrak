import { getUserByIdQHelper } from "@src/lib/helper/bot";
import { getTomorrowsDate } from "@src/lib/helper/date-helper";
import { OrderDoc } from "@src/types/order";
import { Query, QueryWithHelpers } from "mongoose";

type ThisType = Query<OrderDoc[], OrderDoc>;
type ReturnType = ThisType;

export const todays = function (this: ThisType): ReturnType {
  const todaysDate = new Date();
  const weekday = todaysDate.getDay();
  const query = this.find({
    days: weekday,
  });
  return query;
};

export const tomorrows = function (this: ThisType): ReturnType {
  const tomorrowsDate = getTomorrowsDate();
  const tomorrowsWeekday = tomorrowsDate.getDay();
  const query = this.find({
    days: tomorrowsWeekday,
  });
  return query;
};

export const byUserId = getUserByIdQHelper<OrderDoc>();
