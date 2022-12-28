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
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const User_1 = __importDefault(require("../../../model/User"));
const profileConfirmController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const session = ctx.session;
        const messages = new messages_1.default(session, ctx.isTomorrow);
        if (!(0, bot_1.compareEnum)(entry, button_labels_1.default.CONTINUE_WITH_THIS_INFO, button_labels_1.default.ENTER_PROFILE))
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.chooseFromButtons, session_1.SessionStates.PROFILE_CONFIRMATION, reply_markups_1.default.profileConfirmButtons);
        const userId = ctx.userId;
        const user = (yield User_1.default.find().byUserId(userId));
        if ((0, bot_1.compareEnum)(entry, button_labels_1.default.CONTINUE_WITH_THIS_INFO))
            return (0, bot_1.getControllerResult)(messages.getOrderConfirmation(user), session_1.SessionStates.ORDER_CONFIRMATION, reply_markups_1.default.confirmOrderButtons);
        if (session) {
            session.enteringProfile = true;
            yield session.save();
        }
        return (0, bot_1.getControllerResult)(messages.enterName(), session_1.SessionStates.ENTERING_NAME, reply_markups_1.default.enterNameButtons);
    });
};
profileConfirmController.type = controllerTypes_1.default.STATE;
profileConfirmController.occasion = session_1.SessionStates.PROFILE_CONFIRMATION;
exports.default = profileConfirmController;
