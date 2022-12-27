import { Context } from "telegraf";
import { SessionDoc } from "./session";

export type TContext = Context & {
  session: SessionDoc;
  entry: string;
  userId: number;
  phoneNumber?: string;
  queryData?: string;
  queryTitle?: string;
  isTomorrow: boolean;
};
