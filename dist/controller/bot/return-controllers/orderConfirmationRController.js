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
const User_1 = __importDefault(require("../../../model/User"));
const orderConfirmationRController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = new messages_1.default(ctx.session, ctx.isTomorrow);
        const user = yield User_1.default.find().byUserId(ctx.userId);
        if (user)
            return (0, bot_1.getControllerResult)(messages.getProfileConfirmation(user), session_1.SessionStates.PROFILE_CONFIRMATION, reply_markups_1.default.profileConfirmButtons);
        return (0, bot_1.getControllerResult)(messages.getUnit(), session_1.SessionStates.ENTERING_UNIT, reply_markups_1.default.enterUnitButtons);
    });
};
orderConfirmationRController.type = controllerTypes_1.default.RETURN;
orderConfirmationRController.occasion = session_1.SessionStates.ORDER_CONFIRMATION;
exports.default = orderConfirmationRController;
