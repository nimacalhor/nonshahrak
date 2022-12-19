import {
  INDEXED_PERSIAN_WEEKDAYS,
  PERSIAN_WEEKDAYS,
} from "@constants/date-constants";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import { VALID_PHONE_LENGTH } from "@src/lib/constants/bot/general";
import Keywords from "@src/lib/constants/bot/keywords";
import { SessionStates } from "@src/lib/constants/bot/session";
import { BreadPrices } from "@src/lib/constants/general";
import {
  Controller,
  ControllerResult,
  ReplyMarkup,
} from "@src/types/controller";
import { DailyOrderDoc } from "@src/types/dailyOrder";
import { OrderDoc } from "@src/types/order";
import { TContext } from "@t/general-types";
import { Document, Query } from "mongoose";

type OrderKeys = keyof TContext["session"]["order"];

type KeyType = OrderKeys | {} | OrderKeys[];

export const setOrderSession = (ctx: TContext, key: KeyType, value?: any) => {
  if (typeof key === "string")
    return (ctx.session.order[key as OrderKeys] = value);
  if (Array.isArray(key) && key.length > 0)
    return key.forEach((k) => (ctx.session.order[k as OrderKeys] = value));
  ctx.session.order = {};
};

export const compareEnum = (
  text: string,
  ...enums: string[] | ButtonLabels[] | Keywords[] | (string | Keywords)[]
) => (enums as string[]).includes(text);

export const isOrderTypeTomorrow = ({
  session: {
    order: { type },
  },
}: TContext) => compareEnum(type as string, ButtonLabels.ORDER_TYPE_TOMORROW);

export const getAllControllersArr = (
  ...modules: { [key: string]: Controller }[]
) => modules.map((m) => Object.values(m)).flat();

export const validateCtxText = (ctx: TContext) => {
  if (!ctx.message) return false;
  const { text } = ctx.message;
  if (!text) return false;
  return text;
};

export const validateState = (ctx: TContext) => ctx.session?.state;

export const setStateSession = (ctx: TContext, state: any) =>
  (ctx.session.state = state);

export const reply = (
  ctx: TContext,
  message: string,
  reply_markup: ReplyMarkup
) => ctx.reply(message, { reply_markup });

export const getControllerResult = (
  message: string,
  state: SessionStates,
  replyMarkup: ReplyMarkup
): ControllerResult => ({ message, state, replyMarkup });

export const getUserId = (ctx: TContext) => {
  const id = ctx.message ? ctx.message.from?.id : ctx.from?.id;
  if (typeof id === "number") return parseInt(id + "");
  return id;
};
export const getUsername = (ctx: TContext) =>
  ctx.message ? ctx.message.from?.username : ctx.from?.username;

export const isPhone = (phone: string) =>
  phone.trim().length === VALID_PHONE_LENGTH && phone.startsWith("09");

export const calcPrice = (
  amount: number,
  bread: ButtonLabels.BARBARI | ButtonLabels.SANAQAK | string
) => {
  if (compareEnum(bread, ButtonLabels.BARBARI))
    return BreadPrices.BARBARI * amount;
  else return BreadPrices.SANQAK * amount;
};

export const daysToIndex = (days: string[] = []) =>
  [...days].map((d) => INDEXED_PERSIAN_WEEKDAYS.indexOf(d));

export const deleteSession = (ctx: TContext) =>
  ((ctx.session as any) = undefined);

export const getUserByIdQHelper = function <TDoc extends Document>() {
  return function (
    this: Query<TDoc[], TDoc>,
    userId: number | undefined
  ): Query<TDoc | null, TDoc> {
    const query = this.findOne({ userId });
    return query;
  };
};

export const priceGetter = function (this: OrderDoc | DailyOrderDoc) {
  let price: number;
  if ([ButtonLabels.BARBARI as string].includes(this.breadType))
    price = this.amount * BreadPrices.BARBARI;
  else price = this.amount * BreadPrices.SANQAK;
  return price;
};
