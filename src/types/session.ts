import { SessionStates } from "@src/lib/constants/bot/session";
import { HydratedDocument, Model, QueryWithHelpers } from "mongoose";
import { TContext } from "./general-types";

export type SessionOrderKeys =
  | "type"
  | "breadType"
  | "amount"
  | "time"
  | "name"
  | "phone"
  | "block"
  | "entrance"
  | "unit"
  | "floor"
  | "days"
  | "enteringProfile"
  | "price";
export interface SessionOrder {
  type?: string;
  breadType?: string;
  amount?: number;
  time?: string;
  name?: string;
  phone?: string;
  block?: string;
  entrance?: string;
  unit?: string;
  floor?: string;
  days: string[];
  price?: number;
}
export interface Session {
  userId: number;
  chatId: number;
  state: SessionStates;
  order: SessionOrder;
  paymentMessageId?: number;
  enteringProfile: boolean;
  thereIsPaymentMessage?: boolean;
}

export type SessionOrderDoc = HydratedDocument<SessionOrder>;

export type SessionOrderModel = Model<SessionOrderDoc>;

export type SessionDoc = HydratedDocument<Session>;

export interface OrderQueryHelpers {
  byUserId(
    userId: number | undefined
  ): QueryWithHelpers<SessionDoc | null, SessionDoc>;
  byCtx(ctx: TContext): QueryWithHelpers<SessionDoc | null, SessionDoc>;
}
export type SessionModel = Model<SessionDoc, OrderQueryHelpers>;
