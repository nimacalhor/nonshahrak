import ButtonLabels from "@src/lib/constants/bot/button-labels";
import {
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
} from "telegraf/typings/telegram-types";
import { SessionStates } from "@src/lib/constants/bot/session";
import { TContext } from "@t/general-types";
import ControllerTypes from "@src/lib/constants/controllerTypes";
import Commands from "@src/lib/constants/bot/commands";
import Keywords from "@src/lib/constants/bot/keywords";
import Queries from "@src/lib/constants/bot/queries";

export type ReplyMarkup = ReplyKeyboardMarkup | InlineKeyboardMarkup;

export interface ControllerResult {
  state: SessionStates;
  message: string;
  replyMarkup: ReplyMarkup;
}
export interface Controller extends Function {
  (ctx: TContext): Promise<ControllerResult> | ControllerResult;
  occasion: SessionStates | ButtonLabels.RETURN | Commands | Keywords | Queries;
  type: ControllerTypes;
}
export type UpdateHandler = (ctx: TContext) => void;
