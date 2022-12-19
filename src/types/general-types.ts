import { Context } from "telegraf";
import { Session } from "./session";

export type TContext = Context & { session: Session };
