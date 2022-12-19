import { SessionStates } from "./../../lib/constants/bot/session";
import { TContext } from "@t/general-types";
import Commands from "@src/lib/constants/bot/commands";
import ControllerTypes from "@src/lib/constants/controllerTypes";
import {
  compareEnum,
  getAllControllersArr,
  reply,
  setStateSession,
  validateCtxText,
  validateState,
} from "@src/lib/helper/bot";
import { Controller } from "@src/types/controller";
import { Middleware, Telegraf } from "telegraf";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import Keywords from "@src/lib/constants/bot/keywords";
import * as commandControllers from "./command-controllers";
import * as keywordControllers from "./keyword-controllers";
import * as stateControllers from "./state-controllers";
import * as returnControllers from "./return-controllers";

type ControllerList = { [key: string]: Controller };
type Mw = Middleware<TContext>;

const commandControllersList: ControllerList = {};
const keywordControllersList: ControllerList = {};
const returnControllersList: ControllerList = {};
const stateControllersList: ControllerList = {};
const queryControllersList: ControllerList = {};

const allControllers = getAllControllersArr(
  commandControllers,
  keywordControllers,
  stateControllers,
  returnControllers
);

allControllers.forEach((c) => {
  const { type, occasion } = c;
  if (compareEnum(type, ControllerTypes.COMMAND))
    commandControllersList[occasion] = c;
  if (compareEnum(type, ControllerTypes.KEYWORD))
    keywordControllersList[occasion] = c;
  if (compareEnum(type, ControllerTypes.QUERY))
    queryControllersList[occasion] = c;
  if (compareEnum(type, ControllerTypes.RETURN))
    returnControllersList[occasion] = c;
  if (compareEnum(type, ControllerTypes.STATE))
    stateControllersList[occasion] = c;
});

const runController = async (ctx: TContext, c: Controller) => {
  const { message, replyMarkup, state } = await c(ctx);
  setStateSession(ctx, state);
  reply(ctx, message, replyMarkup);
};

export const initCommands = (bot: Telegraf<TContext>) =>
  Object.entries(commandControllersList).forEach(([command, controller]) =>
    bot.command(command, (ctx: TContext) => runController(ctx, controller))
  );

export const returnMw: Mw = async function (ctx, next) {
  const entry = validateCtxText(ctx);
  const state = validateState(ctx);
  if (!entry) return next();
  if (!state) return next();
  if (!compareEnum(entry, ButtonLabels.RETURN)) return next();
  const controller = returnControllersList[state];
  if (!controller) return next();
  await runController(ctx, controller);
};

export const stateMw: Mw = async function (ctx, next) {
  const entry = validateCtxText(ctx);
  const phoneNumber = ctx.message?.contact?.phone_number;
  const state = validateState(ctx);
  if (!entry && !phoneNumber) return next();
  if (!state || state === "") return next();
  const controller = stateControllersList[state];
  if (!controller) return next();
  await runController(ctx, controller);
};

export const keywordMw: Mw = async function (ctx, next) {
  const entry = validateCtxText(ctx);
  if (!entry) return next();
  if (!compareEnum(entry, ...Object.values(Keywords))) return next();
  const controller = keywordControllersList[entry];
  if (!controller) return next();
  await runController(ctx, controller);
};
