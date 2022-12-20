import { getUserByIdQHelper } from "../query-helper-factory";
import { DailyOrderDoc } from "@src/types/dailyOrder";
import { Query } from "mongoose";

export const byUserId = getUserByIdQHelper<DailyOrderDoc>();

export const inDay = function (
  this: Query<DailyOrderDoc[], DailyOrderDoc>,
  day: number
) {
  return this.findOne({ days: day });
};
