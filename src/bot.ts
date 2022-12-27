import { Telegraf } from "telegraf";
import {
  keywordMw,
  queryMw,
  returnMw,
  setEntry,
  setIsOrderTypeTomorrow,
  setQuery,
  setSession,
  setUserId,
  stateMw,
  validateStateExistence,
} from "./bot-middlewares";
import { init, runController } from "./controller/bot/init";
import { TContext } from "./types/general-types";

const token = process.env.MAIN_BOT_TOKEN as string;

// initialize
const bot = new Telegraf<TContext>(token);

const {
  keywordControllersList,
  queryControllersList,
  returnControllersList,
  stateControllersList,
} = init(bot);

bot.use(setUserId);
bot.use(setQuery);
bot.use(queryMw(queryControllersList, runController));

bot.use(setEntry);
bot.use(keywordMw(keywordControllersList, runController));

bot.use(setSession);
bot.use(setIsOrderTypeTomorrow);
bot.use(validateStateExistence);
bot.use(returnMw(returnControllersList, runController));
bot.use(stateMw(stateControllersList, runController));

console.log("bot configured");
export default bot;

// userId
//    |
// command controller
//    |
// query
//    |
// query controller
//    |
// entry
//    |
// keyword controller
//    |
// session
//    |
// state
//    |
// return controller
//    |
// state controller
