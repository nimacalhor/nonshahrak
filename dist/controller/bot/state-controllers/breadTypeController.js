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
const bot_1 = require("../../../lib/helper/bot");
const session_1 = require("../../../lib/constants/bot/session");
const controllerTypes_1 = __importDefault(require("../../../lib/constants/controllerTypes"));
const reply_markups_1 = __importDefault(require("../../../view/reply-markups"));
const bot_2 = require("../../../lib/helper/bot");
const messages_1 = __importDefault(require("../../../view/messages"));
const button_labels_1 = __importDefault(require("../../../lib/constants/bot/button-labels"));
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const breadTypeController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const messages = new messages_1.default(ctx.session, ctx.isTomorrow);
        if (!(0, bot_2.compareEnum)(entry, button_labels_1.default.BARBARI, button_labels_1.default.SANAQAK))
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.chooseFromButtons, session_1.SessionStates.ENTERING_BREAD_TYPE, reply_markups_1.default.breadTypeButtons);
        yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "breadType", entry);
        return (0, bot_1.getControllerResult)(messages.enterBreadAmount(), session_1.SessionStates.ENTERING_BREAD_AMOUNT, reply_markups_1.default.breadAmountButtons);
    });
};
breadTypeController.type = controllerTypes_1.default.STATE;
breadTypeController.occasion = session_1.SessionStates.ENTERING_BREAD_TYPE;
exports.default = breadTypeController;
