import {
  INDEXED_PERSIAN_WEEKDAYS,
  PERSIAN_WEEKDAYS,
} from "@constants/date-constants";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import {
  DAILY_ORDER_ROW_BUTTON_AMOUNT,
  VALID_PHONE_LENGTH,
} from "@src/lib/constants/bot/general";
import Keywords from "@src/lib/constants/bot/keywords";
import Queries from "@src/lib/constants/bot/queries";
import { SessionStates } from "@src/lib/constants/bot/session";
import { BreadPrices } from "@src/lib/constants/general";
import Session from "@src/model/Session";
import {
  Controller,
  ControllerResult,
  ReplyMarkup,
} from "@src/types/controller";
import { DailyOrderDoc } from "@src/types/dailyOrder";
import { OrderDoc } from "@src/types/order";
import { SessionDoc, SessionOrder, SessionOrderKeys } from "@src/types/session";
import { TContext } from "@t/general-types";
import { Document, Query } from "mongoose";

type KeyType = SessionOrderKeys | SessionOrderKeys[];

// ______________________________

export const setOrderSession = async (
  userId: number | undefined,
  key?: KeyType,
  value?: any
) => {
  const session = (await Session.find().byUserId(userId)) as SessionDoc;
  if (typeof key === "string") {
    (session.order as any)[key] = value;
    await session.save();
    return session;
  }
  if (Array.isArray(key) && key.length > 0) {
    key.forEach((k) => ((session.order as any)[k] = value));
    await session.save();
    return session;
  }
  session.order = { days: [] };
  await session.save();
  return session;
};

// ______________________________

export const compareEnum = (
  text: string,
  ...enums: string[] | ButtonLabels[] | Keywords[] | (string | Keywords)[]
) => (enums as string[]).includes(text);

// ______________________________

export const isOrderTypeTomorrow = async (userId: number | undefined) => {
  const session = await Session.find().byUserId(userId);
  if (!session || !session.order) return false;
  return compareEnum(
    session.order.type as string,
    ButtonLabels.ORDER_TYPE_TOMORROW
  );
};

// ______________________________

export const getAllControllersArr = (
  ...modules: { [key: string]: Controller }[]
) => modules.map((m) => Object.values(m)).flat();

// ______________________________

export const validateCtxText = (ctx: TContext) => {
  if (!ctx.message) return false;
  const { text } = ctx.message;
  if (!text) return false;
  return text;
};

// ______________________________

export const validateCtxQueryData = (ctx: TContext) => {
  if (!ctx.callbackQuery) return false;
  const { data } = ctx.callbackQuery;
  if (!data) return false;
  return data;
};

// ______________________________

export const getQueryTitle = (query: string) => {
  const matchResult = Object.values(Queries)
    .join(" ")
    .match(new RegExp(query, "gm"));
  if (!matchResult) return false;
  return matchResult[0];
};

// ______________________________

export const reply = (
  ctx: TContext,
  message: string,
  reply_markup: ReplyMarkup
) => ctx.reply(message, { reply_markup });

// ______________________________

export const getControllerResult = (
  message: string,
  state: SessionStates,
  replyMarkup: ReplyMarkup,
  saveOnSession?: boolean
): ControllerResult => ({ message, state, replyMarkup, saveOnSession });

// ______________________________

export const getUserId = (ctx: TContext) => {
  const id = ctx.message ? ctx.message.from?.id : ctx.from?.id;
  if (typeof id === "number") return parseInt(id + "");
  return id;
};
// ______________________________

export const getUsername = (ctx: TContext) =>
  ctx.message ? ctx.message.from?.username : ctx.from?.username;

// ______________________________

export const getChatId = (ctx: TContext) =>
  ctx.chat ? ctx.chat.id : ctx.message?.chat.id;

// ______________________________

export const isPhone = (phone: string) =>
  phone.trim().length === VALID_PHONE_LENGTH && phone.startsWith("09");

// ______________________________

export const calcPrice = (
  amount: number,
  bread: ButtonLabels.BARBARI | ButtonLabels.SANAQAK | string
) => {
  if (compareEnum(bread, ButtonLabels.BARBARI))
    return BreadPrices.BARBARI * amount;
  else return BreadPrices.SANQAK * amount;
};

// ______________________________

export const daysToIndex = (days: string[] = []) =>
  [...days].map((d) => PERSIAN_WEEKDAYS.filter((d) => d !== "_").indexOf(d));

// ______________________________

export const validateState = async (ctx: TContext) => {
  const session = await Session.find().byCtx(ctx);
  if (!session) return false;
  return session.state;
};

export const divideArray = function (
  arr: any[],
  chunkSize: number = DAILY_ORDER_ROW_BUTTON_AMOUNT
) {
  const resultArr = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    resultArr.push(chunk);
  }
  return resultArr;
};
