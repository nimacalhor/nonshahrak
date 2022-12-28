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
const zarinpal_1 = require("./../../../zarinpal");
const session_1 = require("../../../lib/constants/bot/session");
const controllerTypes_1 = __importDefault(require("../../../lib/constants/controllerTypes"));
const reply_markups_1 = __importDefault(require("../../../view/reply-markups"));
const bot_1 = require("../../../lib/helper/bot");
const messages_1 = __importDefault(require("../../../view/messages"));
const button_labels_1 = __importDefault(require("../../../lib/constants/bot/button-labels"));
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const Order_1 = __importDefault(require("../../../model/Order"));
const User_1 = __importDefault(require("../../../model/User"));
const DailyOrder_1 = __importDefault(require("../../../model/DailyOrder"));
const date_helper_1 = require("../../../lib/helper/date-helper");
const orderConfirmationController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const isTomorrow = ctx.isTomorrow;
        const messages = new messages_1.default(ctx.session, isTomorrow);
        const session = ctx.session;
        if ((0, bot_1.compareEnum)(entry, button_labels_1.default.CANCEL_ORDER)) {
            session && (yield session.remove());
            return (0, bot_1.getControllerResult)(messages.botProcessMessage, session_1.SessionStates.UNDEFINED, reply_markups_1.default.mainButtons);
        }
        let user = null;
        const userId = ctx.userId;
        const userInDb = yield User_1.default.find().byUserId(userId);
        if (!session || !session.order)
            return (0, bot_1.getControllerResult)(messages.botProcessMessage, session_1.SessionStates.UNDEFINED, reply_markups_1.default.mainButtons);
        if (userInDb) {
            if (session.enteringProfile)
                userInDb.remove();
            else
                user = userInDb;
        }
        else {
            const { name, phone, block, entrance, floor, unit } = session.order;
            const username = (0, bot_1.getUsername)(ctx);
            user = yield User_1.default.create({
                name,
                phone,
                block,
                entrance,
                floor,
                unit,
                userId,
                username,
            });
        }
        if (!isTomorrow) {
            const { days, breadType, amount, time } = session.order;
            const dailyOrderToReplace = yield DailyOrder_1.default.find().byUserId(userId);
            yield Promise.all([
                dailyOrderToReplace === null || dailyOrderToReplace === void 0 ? void 0 : dailyOrderToReplace.remove(),
                DailyOrder_1.default.create({
                    days: (0, bot_1.daysToIndex)(days),
                    breadType,
                    amount,
                    time,
                    user: user._id,
                    userId,
                }),
                session.remove(),
            ]);
            return (0, bot_1.getControllerResult)(messages.orderSubmitted(), session_1.SessionStates.UNDEFINED, reply_markups_1.default.mainButtons);
        }
        const { amount, breadType, time } = session.order;
        ctx.reply("⏳ ...", { reply_markup: reply_markups_1.default.paymentButtons });
        const response = yield (0, zarinpal_1.paymentRequest)((0, bot_1.calcPrice)(parseInt(amount), breadType));
        if (response) {
            const tmrDate = (0, date_helper_1.getTomorrowsDate)();
            const ordersToReplace = yield Order_1.default.find({
                userId,
                day: tmrDate.getDate(),
                month: tmrDate.getMonth(),
            });
            yield Promise.all([
                ...ordersToReplace.map((doc) => {
                    doc.duplicated = true;
                    return doc.save();
                }),
                Order_1.default.create({
                    breadType,
                    amount,
                    time,
                    user: user._id,
                    authority: response.authority,
                    userId,
                }),
            ]);
            return (0, bot_1.getControllerResult)(messages.orderSubmitted(), session_1.SessionStates.PURCHASING_ORDER, reply_markups_1.default.paymentLink(response.url), true);
        }
        return (0, bot_1.getControllerResult)(AlertMessages_1.default.paymentReqErr, session_1.SessionStates.ORDER_CONFIRMATION, reply_markups_1.default.confirmOrderButtons);
    });
};
orderConfirmationController.type = controllerTypes_1.default.STATE;
orderConfirmationController.occasion = session_1.SessionStates.ORDER_CONFIRMATION;
exports.default = orderConfirmationController;
