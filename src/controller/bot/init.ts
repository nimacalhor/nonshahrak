import { SessionStates } from "./../../lib/constants/bot/session";
import { TContext } from "@t/general-types";
import ControllerTypes from "@src/lib/constants/controllerTypes";
import { Controller } from "@src/types/controller";
import { Middleware, Telegraf } from "telegraf";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import Keywords from "@src/lib/constants/bot/keywords";
import * as commandControllers from "./command-controllers";
import * as keywordControllers from "./keyword-controllers";
import * as stateControllers from "./state-controllers";
import * as returnControllers from "./return-controllers";
import * as queryControllers from "./query-controllers";
import Session from "@src/model/Session";
import {
  compareEnum,
  getAllControllersArr,
  getChatId,
  getUserId,
  reply,
} from "@src/lib/helper/bot";

export type ControllerList = { [key: string]: Controller };
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
  returnControllers,
  queryControllers
);

const initControllers = () =>
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

export const runController = async (ctx: TContext, c: Controller) => {
  const result = await c(ctx);
  if (!result) return;
  const { message, replyMarkup, state, saveOnSession } = result;
  const session = await Session.findOne({ userId: getUserId(ctx) });
  if (session) {
    if (compareEnum(state, SessionStates.UNDEFINED)) {
      await session.remove();
    } else {
      session.state = state;
      await session.save();
    }
  } else {
    const userId = getUserId(ctx);
    const chatId = getChatId(ctx);
    await Session.create({ userId, chatId, state, order: {} });
  }
  const replyMessage = await reply(ctx, message, replyMarkup);
  if (saveOnSession && session) {
    session.paymentMessageId = replyMessage.message_id;
    session.save();
  }
};

const initCommands = (bot: Telegraf<TContext>) =>
  Object.entries(commandControllersList).forEach(([command, controller]) =>
    bot.command(command, (ctx: TContext) => runController(ctx, controller))
  );

type InitReturnType = {
  keywordControllersList: ControllerList;
  returnControllersList: ControllerList;
  stateControllersList: ControllerList;
  queryControllersList: ControllerList;
};

export const init = function (bot: Telegraf<TContext>): InitReturnType {
  initControllers();
  initCommands(bot);
  return new (class {
    readonly keywordControllersList = keywordControllersList;
    readonly returnControllersList = returnControllersList;
    readonly stateControllersList = stateControllersList;
    readonly queryControllersList = queryControllersList;
  })();
};
