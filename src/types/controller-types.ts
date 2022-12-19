import { TContext } from "@t/general-types";
import { SessionStates } from "../lib/constants/bot/session";
import {
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
} from "telegraf/typings/telegram-types";

type ValidateReplyType = [string, ReplyKeyboardMarkup];

type ValidateReturnType =
  | void
  | Promise<void>
  | false
  | Promise<false>
  | string
  | Promise<string>
  | ValidateReplyType
  | Promise<ValidateReplyType>;

export interface ControllerStructure {
  message: string;
  newState: SessionStates | undefined;
  replyMarkup?: ReplyKeyboardMarkup | InlineKeyboardMarkup;
  messageCases?: { [key: string]: string };
  markupCases?: { [key: string]: ReplyKeyboardMarkup | undefined };
  data?: { [key: string]: any };
  init?: (ctx: TContext) => any | Promise<any>;
  validate?: (ctx: TContext) => ValidateReturnType;
  main: (ctx: TContext) => void | Promise<void>;
}

export interface CommandControllerStructure extends ControllerStructure {
  command: string;
}
export interface KeywordControllerStructure extends ControllerStructure {
  keyword: string;
}
export interface StateControllerStructure extends ControllerStructure {
  state: SessionStates;
}
