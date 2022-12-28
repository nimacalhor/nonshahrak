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
const breadTypeRController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "breadType", undefined);
        const isTomorrow = ctx.isTomorrow;
        if (isTomorrow) {
            yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "type", undefined);
            const messages = new messages_1.default(ctx.session, isTomorrow);
            return (0, bot_1.getControllerResult)(messages.orderBread, session_1.SessionStates.ENTERING_ORDER_TYPE, reply_markups_1.default.orderTypeButtons);
        }
        const messages = new messages_1.default(ctx.session, isTomorrow);
        const session = yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "days", []);
        const days = session ? session.order.days : [];
        return (0, bot_1.getControllerResult)(messages.chooseWeekdays(), session_1.SessionStates.ENTERING_WEEK_DAYS, reply_markups_1.default.chooseWeekdaysButtons(days));
    });
};
breadTypeRController.type = controllerTypes_1.default.RETURN;
breadTypeRController.occasion = session_1.SessionStates.ENTERING_BREAD_TYPE;
exports.default = breadTypeRController;
