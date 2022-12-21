import {
  HydratedDocument,
  Model,
  ObjectId,
  QueryWithHelpers,
  VirtualPathFunctions,
} from "mongoose";

export interface Order {
  breadType: string;
  amount: number;
  time: string;
  user: ObjectId;
  userId: number;
  price: number;
  date: Date;
  paid: boolean;
  authority: string;
  refId: string | number;
}

export interface OrderVirtuals {
  dateString: {
    get: () => string;
  };
}

export type OrderDoc = HydratedDocument<Order, {}, OrderVirtuals>;

export interface OrderQueryHelpers {
  byUserId(userId: number | undefined): QueryWithHelpers<OrderDoc[], OrderDoc>;
  todays(): QueryWithHelpers<OrderDoc[], OrderDoc>;
  tomorrows(): QueryWithHelpers<OrderDoc[], OrderDoc>;
}

export type OrderModel = Model<OrderDoc, OrderQueryHelpers, {}, OrderVirtuals>;
