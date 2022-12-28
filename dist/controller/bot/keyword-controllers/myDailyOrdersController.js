"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_1 = require("../../../lib/constants/bot/session");
const controllerTypes_1 = __importDefault(require("../../../lib/constants/controllerTypes"));
const reply_markups_1 = __importDefault(require("../../../view/reply-markups"));
const bot_1 = require("../../../lib/helper/bot");
const messages_1 = __importDefault(require("../../../view/messages"));
const keywords_1 = __importDefault(require("../../../lib/constants/bot/keywords"));
const DailyOrder_1 = __importDefault(require("../../../model/DailyOrder"));
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const myDailyOrdersController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.reply("⏳ ...");
        const userId = ctx.userId;
        const messages = new messages_1.default(null);
        const dailyOrder = yield DailyOrder_1.default.find().byUserId(userId);
        if (!dailyOrder)
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.noDailyOrder, session_1.SessionStates.UNDEFINED, reply_markups_1.default.mainButtons);
        const dates = dailyOrder.getDates();
        return (0, bot_1.getControllerResult)(messages.getOrderString(dailyOrder), session_1.SessionStates.UNDEFINED, reply_markups_1.default.dailyOrderButtons(dates));
    });
};
myDailyOrdersController.type = controllerTypes_1.default.KEYWORD;
myDailyOrdersController.occasion = keywords_1.default.MY_DAILY_ORDERS;
exports.default = myDailyOrdersController;
