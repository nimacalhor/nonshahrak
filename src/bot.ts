import { Telegraf, Context } from "telegraf";
import {
  initCommands,
  returnMw,
  stateMw,
  keywordMw,
  queryMw,
} from "./controller/bot/init";

const token = process.env.MAIN_BOT_TOKEN as string;

// initialize
const bot = new Telegraf<Context & { session: any }>(token);

initCommands(bot);
bot.use(returnMw);
bot.use(stateMw);
bot.use(keywordMw);
bot.use(queryMw);

console.log("bot configured");
export default bot;
