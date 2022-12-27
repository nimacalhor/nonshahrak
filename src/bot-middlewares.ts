import { Middleware } from "telegraf";
import { TContext } from "./types/general-types";
import {
  compareEnum,
  getQueryTitle,
  getUserId,
  isOrderTypeTomorrow,
  validateCtxQueryData,
  validateCtxText,
} from "./lib/helper/bot";
import AlertMessages from "./view/messages/AlertMessages";
import Session from "./model/Session";
import { SessionStates } from "./lib/constants/bot/session";
import ButtonLabels from "./lib/constants/bot/button-labels";
import { ControllerList } from "./controller/bot/init";
import { Controller } from "./types/controller";
import Keywords from "./lib/constants/bot/keywords";

type Mw = Middleware<TContext>;
type HandlerMw = (
  list: ControllerList,
  runController: (ctx: TContext, c: Controller) => any
) => Mw;

/**
 * adds entry to ctx object
 */
export const setEntry: Mw = function (ctx, next) {
  const entry = validateCtxText(ctx);
  const phoneNumber = ctx.message?.contact?.phone_number;
  if (entry || phoneNumber) {
    ctx.entry = entry || "";
    ctx.phoneNumber = phoneNumber;
    return next();
  }
  return ctx.reply(AlertMessages.addStart(AlertMessages.noEntry));
};

/**
 * adds userId to ctx object
 */
export const setUserId: Mw = function (ctx, next) {
  const userId = getUserId(ctx);
  if (userId) {
    ctx.userId = userId;
    return next();
  }
  return ctx.reply(AlertMessages.addStart(AlertMessages.noUserIdFound));
};

const wentWrongMessage = AlertMessages.addStart(
  AlertMessages.somethingWentWrong
);
/**
 * adds session to ctx Object
 */
export const setSession: Mw = async function (ctx, next) {
  const session = await Session.find().byUserId(ctx.userId);
  if (session) {
    ctx.session = session;
    return next();
  }
  return ctx.reply(wentWrongMessage);
};

/**
 *
 */
export const validateStateExistence: Mw = function (ctx, next) {
  const state = ctx.session.state;
  if (state) {
    return next();
  }
  return ctx.reply(wentWrongMessage);
};

/**
 * adds query to the ctx object
 */
export const setQuery: Mw = function (ctx, next) {
  const queryData = validateCtxQueryData(ctx);

  const queryTitle = getQueryTitle(queryData);

  ctx.queryData = queryData || undefined;
  ctx.queryTitle = queryTitle || undefined;
  return next();
};

export const setIsOrderTypeTomorrow: Mw = async function (ctx, next) {
  const isTomorrow = await isOrderTypeTomorrow(ctx.userId);
  ctx.isTomorrow = isTomorrow;
  return next();
};

export const returnMw: HandlerMw = (list, runController) =>
  async function (ctx, next) {
    const entry = ctx.entry;
    const { state } = ctx.session;
    // const state = await validateState(ctx);
    // if (!entry) return next();
    // if (!state) return next();
    if (!compareEnum(entry, ButtonLabels.RETURN)) return next();
    const controller = list[state];
    if (!controller) return next();
    await runController(ctx, controller);
  };

export const stateMw: HandlerMw = (list, runController) =>
  async function (ctx, next) {
    const entry = ctx.entry;
    const phoneNumber = ctx.phoneNumber;
    const { state } = ctx.session;
    // if (!entry && !phoneNumber) return next();
    // if (!state || compareEnum(state, SessionStates.UNDEFINED)) return next();
    const controller = list[state];
    if (!controller) return next();
    await runController(ctx, controller);
  };

export const keywordMw: HandlerMw = (list, runController) =>
  async function (ctx, next) {
    const entry = ctx.entry;
    if (!compareEnum(entry, ...Object.values(Keywords))) return next();
    const controller = list[entry];
    if (!controller) return next();
    await runController(ctx, controller);
  };

export const queryMw: HandlerMw = (list, runController) =>
  async function (ctx, next) {
    const queryTitle = ctx.queryTitle;
    if (!queryTitle) return next();
    const controller = list[queryTitle];
    if (!controller) return next();
    await runController(ctx, controller);
  };
