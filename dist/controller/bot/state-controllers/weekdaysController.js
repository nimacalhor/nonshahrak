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
const button_labels_1 = __importDefault(require("../../../lib/constants/bot/button-labels"));
const date_constants_1 = require("../../../lib/constants/date-constants");
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const weekdaysController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const weekdays = date_constants_1.PERSIAN_WEEKDAYS.filter((d) => d !== "_");
        const deleteWeekdays = date_constants_1.DELETE_PERSIAN_WEEKDAYS;
        let session = ctx.session;
        if ((0, bot_1.compareEnum)(entry, ...weekdays)) {
            session = yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "days", [
                ...new Set([...(session.order.days || []), entry]),
            ]);
            const messages = new messages_1.default(ctx.session, ctx.isTomorrow);
            return (0, bot_1.getControllerResult)(messages.daySelected(), session_1.SessionStates.ENTERING_WEEK_DAYS, reply_markups_1.default.chooseWeekdaysButtons(session.order.days));
        }
        if ((0, bot_1.compareEnum)(entry, ...deleteWeekdays)) {
            session = yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "days", [...(session.order.days || [])].filter((d) => d !== entry.replace("حذف ", "")));
            const messages = new messages_1.default(ctx.session, ctx.isTomorrow);
            return (0, bot_1.getControllerResult)(messages.dayDeleted(), session_1.SessionStates.ENTERING_WEEK_DAYS, reply_markups_1.default.chooseWeekdaysButtons(session.order.days));
        }
        if ((0, bot_1.compareEnum)(entry, button_labels_1.default.CONFIRM)) {
            if (session.order.days.length === 0)
                return (0, bot_1.getControllerResult)(AlertMessages_1.default.noDaySelected, session_1.SessionStates.ENTERING_WEEK_DAYS, reply_markups_1.default.chooseWeekdaysButtons([]));
            const messages = new messages_1.default(ctx.session, ctx.isTomorrow);
            return (0, bot_1.getControllerResult)(messages.chooseBreadType(), session_1.SessionStates.ENTERING_BREAD_TYPE, reply_markups_1.default.breadTypeButtons);
        }
        return (0, bot_1.getControllerResult)(AlertMessages_1.default.chooseFromButtons, session_1.SessionStates.ENTERING_WEEK_DAYS, reply_markups_1.default.chooseWeekdaysButtons(session.order.days));
    });
};
weekdaysController.type = controllerTypes_1.default.STATE;
weekdaysController.occasion = session_1.SessionStates.ENTERING_WEEK_DAYS;
exports.default = weekdaysController;
