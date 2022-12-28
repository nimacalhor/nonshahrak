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
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const session_1 = require("../../../lib/constants/bot/session");
const controllerTypes_1 = __importDefault(require("../../../lib/constants/controllerTypes"));
const reply_markups_1 = __importDefault(require("../../../view/reply-markups"));
const bot_1 = require("../../../lib/helper/bot");
const messages_1 = __importDefault(require("../../../view/messages"));
const keywords_1 = __importDefault(require("../../../lib/constants/bot/keywords"));
const Order_1 = __importDefault(require("../../../model/Order"));
const myOrdersController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = ctx.userId;
        const messages = new messages_1.default(null);
        ctx.reply("⏳ ...");
        const orders = yield Order_1.default.find().byUserId(userId).where("paid").equals(true);
        if (orders.length === 0)
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.noSubmittedOrder, session_1.SessionStates.UNDEFINED, reply_markups_1.default.mainButtons);
        orders
            .slice(0, orders.length - 1)
            .forEach((order) => ctx.reply(messages.getOrderString(order)));
        return (0, bot_1.getControllerResult)(messages.getOrderString(orders.slice(orders.length - 1)[0]), session_1.SessionStates.UNDEFINED, reply_markups_1.default.mainButtons);
    });
};
myOrdersController.type = controllerTypes_1.default.KEYWORD;
myOrdersController.occasion = keywords_1.default.MY_ORDER;
exports.default = myOrdersController;
