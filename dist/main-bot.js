"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const init_1 = require("./controller/bot/init");
const token = process.env.MAIN_BOT_TOKEN;
const bot = new telegraf_1.Telegraf(token);
(0, init_1.initCommands)(bot);
bot.use(init_1.returnMw);
bot.use(init_1.stateMw);
bot.use(init_1.keywordMw);
console.log("bot configured");
exports.default = bot;
