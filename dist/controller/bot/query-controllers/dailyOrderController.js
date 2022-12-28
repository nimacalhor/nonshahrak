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
const bot_1 = require("../../../lib/helper/bot");
const messages_1 = __importDefault(require("../../../view/messages"));
const reply_markups_1 = __importDefault(require("../../../view/reply-markups"));
const queries_1 = __importDefault(require("../../../lib/constants/bot/queries"));
const date_helper_1 = require("../../../lib/helper/date-helper");
const DailyOrder_1 = __importDefault(require("../../../model/DailyOrder"));
const Order_1 = __importDefault(require("../../../model/Order"));
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const zarinpal_1 = require("../../../zarinpal");
const dailyOrdersController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.callbackQuery.data;
        const session = ctx.session;
        if (session && session.thereIsPaymentMessage) {
            ctx.reply("☹");
            return undefined;
        }
        const userId = ctx.userId;
        const messages = new messages_1.default(session, yield (0, bot_1.isOrderTypeTomorrow)(userId));
        const [_, day, timestamp] = entry.split("_");
        ctx.reply("⏳ ...", { reply_markup: reply_markups_1.default.paymentButtons });
        const dailyOrder = (yield DailyOrder_1.default.find()
            .byUserId(userId)
            .populate("user"));
        const { amount, breadType, time } = dailyOrder;
        const response = yield (0, zarinpal_1.paymentRequest)((0, bot_1.calcPrice)(parseInt(amount), breadType));
        if (!response)
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.paymentReqErr, session_1.SessionStates.ORDER_CONFIRMATION, reply_markups_1.default.confirmOrderButtons);
        if (day === "purchaseNextWeek" || !timestamp) {
            const nextWeekDates = (0, date_helper_1.getNextWeekDates)(dailyOrder.days);
            console.log({
                nextWeekDates: nextWeekDates.map((dt) => ({
                    day: dt.getDate(),
                    month: dt.getMonth(),
                })),
            });
            const paidOrdersInNextWeek = yield Order_1.default.find({
                userId,
                paid: true,
                $or: nextWeekDates.map((dt) => ({
                    day: dt.getDate(),
                    month: dt.getMonth(),
                })),
            }).select(["day", "month"]);
            console.log({ paidOrdersInNextWeek });
            if (nextWeekDates.length === paidOrdersInNextWeek.length)
                return (0, bot_1.getControllerResult)(AlertMessages_1.default.orderHasBeenPurchased(true), session_1.SessionStates.UNDEFINED, reply_markups_1.default.mainButtons);
            const notPaidDates = nextWeekDates.filter((date) => !paidOrdersInNextWeek.some((doc) => doc.day === date.getDate() && doc.month === date.getMonth()));
            console.log({
                notPaidDates: notPaidDates.map((dt) => ({
                    day: dt.getDate(),
                    month: dt.getMonth(),
                })),
            });
            yield Order_1.default.insertMany(notPaidDates.map((dt) => ({
                breadType,
                amount,
                time,
                user: dailyOrder.user._id,
                authority: response.authority,
                userId,
                date: new Date(dt),
            })));
            if (session) {
                session.thereIsPaymentMessage = true;
                yield session.save();
            }
            return (0, bot_1.getControllerResult)(messages.orderSubmitted(true), session_1.SessionStates.PURCHASING_ORDER, reply_markups_1.default.paymentLink(response.url), true);
        }
        const selectedDate = new Date(parseInt(timestamp));
        const orderInDb = yield Order_1.default.exists({
            userId,
            paid: true,
            day: selectedDate.getDate(),
            month: selectedDate.getMonth(),
        });
        if (orderInDb)
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.orderHasBeenPurchased(), session_1.SessionStates.UNDEFINED, reply_markups_1.default.mainButtons);
        yield Order_1.default.create({
            breadType,
            amount,
            time,
            user: dailyOrder.user._id,
            authority: response.authority,
            userId,
            date: new Date(parseInt(timestamp)),
        });
        if (session) {
            session.thereIsPaymentMessage = true;
            yield session.save();
        }
        return (0, bot_1.getControllerResult)(messages.orderSubmitted(true), session_1.SessionStates.PURCHASING_ORDER, reply_markups_1.default.paymentLink(response.url), true);
    });
};
dailyOrdersController.type = controllerTypes_1.default.QUERY;
dailyOrdersController.occasion = queries_1.default.DAILY_ORDER;
exports.default = dailyOrdersController;
