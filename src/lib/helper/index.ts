import { TContext } from "@src/types/general-types";
import { Context } from "telegraf";

export const checkTextLength = (str: string, num: number) => str.length <= num;

export const isNumber = (val: string) => !isNaN(parseFloat(val));
