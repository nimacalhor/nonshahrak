import {
  HydratedDocument,
  Model,
  ObjectId,
  Query,
  QueryWithHelpers,
} from "mongoose";

export interface Order {
  breadType: string;
  amount: number;
  time: string;
  user: ObjectId;
  userId: number;
  price: number;
  date: Date;
  day: number;
  month: number;
  year: number;
  paid: boolean;
  authority: string;
  refId: string | number;
  duplicated: boolean;
}

export interface OrderVirtuals {
  dateString: {
    get: () => string;
  };
}

export type OrderDoc = HydratedDocument<Order, {}, OrderVirtuals>;

export interface OrderQueryHelpers {
  byUserId(
    userId: number | undefined
  ): QueryWithHelpers<OrderDoc[], OrderDoc, OrderQueryHelpers>;
  tomorrows(): Query<OrderDoc[], OrderDoc>;
}

export type OrderModel = Model<OrderDoc, OrderQueryHelpers, {}, OrderVirtuals>;
