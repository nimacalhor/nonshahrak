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
const button_labels_1 = __importDefault(require("../../../lib/constants/bot/button-labels"));
const session_1 = require("../../../lib/constants/bot/session");
const controllerTypes_1 = __importDefault(require("../../../lib/constants/controllerTypes"));
const bot_1 = require("../../../lib/helper/bot");
const date_helper_1 = require("../../../lib/helper/date-helper");
const DailyOrder_1 = __importDefault(require("../../../model/DailyOrder"));
const Order_1 = __importDefault(require("../../../model/Order"));
const messages_1 = __importDefault(require("../../../view/messages"));
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const reply_markups_1 = __importDefault(require("../../../view/reply-markups"));
const orderTypeController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        if (!(0, bot_1.compareEnum)(entry, button_labels_1.default.ORDER_TYPE_DAILY, button_labels_1.default.ORDER_TYPE_TOMORROW))
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.chooseFromButtons, session_1.SessionStates.ENTERING_ORDER_TYPE, reply_markups_1.default.orderTypeButtons);
        ctx.reply("⌛ ...");
        yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "type", entry);
        let itemExists = false;
        let isTomorrow = ctx.isTomorrow;
        const userId = ctx.userId;
        if (isTomorrow) {
            const orderForTomorrow = yield Order_1.default.exists({
                userId,
                day: (0, date_helper_1.getTomorrowsDate)().getDate(),
                month: (0, date_helper_1.getTomorrowsDate)().getMonth(),
            });
            if (orderForTomorrow)
                itemExists = true;
        }
        else {
            const dailyOrder = yield DailyOrder_1.default.exists({ userId });
            if (dailyOrder)
                itemExists = true;
        }
        if (itemExists)
            ctx.reply(AlertMessages_1.default.orderExists(isTomorrow));
        const session = ctx.session;
        const messages = new messages_1.default(session, isTomorrow);
        const days = session ? session.order.days : [];
        const message = isTomorrow
            ? messages.chooseBreadType()
            : messages.chooseWeekdays();
        const replyMarkup = isTomorrow
            ? reply_markups_1.default.breadTypeButtons
            : reply_markups_1.default.chooseWeekdaysButtons(days);
        const state = isTomorrow
            ? session_1.SessionStates.ENTERING_BREAD_TYPE
            : session_1.SessionStates.ENTERING_WEEK_DAYS;
        return (0, bot_1.getControllerResult)(message, state, replyMarkup);
    });
};
orderTypeController.type = controllerTypes_1.default.STATE;
orderTypeController.occasion = session_1.SessionStates.ENTERING_ORDER_TYPE;
exports.default = orderTypeController;
