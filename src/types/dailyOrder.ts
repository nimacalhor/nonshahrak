import { HydratedDocument, Model, ObjectId, QueryWithHelpers } from "mongoose";

export interface DailyOrder {
  days: number[];
  breadType: string;
  amount: number;
  time: string;
  user: ObjectId;
  userId: number;
  price: number;
}

export type DailyOrderDoc = HydratedDocument<DailyOrder>;

export interface DailyOrderQueryHelpers {
  byUserId(
    userId: number
  ): QueryWithHelpers<DailyOrderDoc | null, DailyOrderDoc>;
  inDay(day: number): QueryWithHelpers<DailyOrderDoc | null, DailyOrderDoc>;
}

export interface OrderVirtuals {
  price: {
    get(): number;
  };
}
export type DailyOrderModel = Model<DailyOrderDoc, {}, {}, OrderVirtuals>;
