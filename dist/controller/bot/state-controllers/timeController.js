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
const general_1 = require("../../../lib/constants/bot/general");
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const User_1 = __importDefault(require("../../../model/User"));
const timeController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const hour = parseInt(entry);
        if (isNaN(hour))
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.timeFormatError, session_1.SessionStates.ENTERING_TIME, reply_markups_1.default.enterTimeButtons);
        if (!(hour > general_1.START_WORK_HOUR) || !(hour < general_1.END_WORK_HOUR))
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.timePeriodErr, session_1.SessionStates.ENTERING_TIME, reply_markups_1.default.enterTimeButtons);
        yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "time", entry);
        const messages = new messages_1.default(ctx.session, ctx.isTomorrow);
        const userId = ctx.userId;
        const user = yield User_1.default.find().byUserId(userId);
        if (!user)
            return (0, bot_1.getControllerResult)(messages.enterName(), session_1.SessionStates.ENTERING_NAME, reply_markups_1.default.enterNameButtons);
        return (0, bot_1.getControllerResult)(messages.getProfileConfirmation(user), session_1.SessionStates.PROFILE_CONFIRMATION, reply_markups_1.default.profileConfirmButtons);
    });
};
timeController.type = controllerTypes_1.default.STATE;
timeController.occasion = session_1.SessionStates.ENTERING_TIME;
exports.default = timeController;
