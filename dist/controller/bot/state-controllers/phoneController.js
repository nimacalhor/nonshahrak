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
const index_1 = require("./../../../lib/helper/bot/index");
const session_1 = require("../../../lib/constants/bot/session");
const controllerTypes_1 = __importDefault(require("../../../lib/constants/controllerTypes"));
const reply_markups_1 = __importDefault(require("../../../view/reply-markups"));
const bot_1 = require("../../../lib/helper/bot");
const messages_1 = __importDefault(require("../../../view/messages"));
const helper_1 = require("../../../lib/helper");
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const phoneController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const messages = new messages_1.default(ctx.session, ctx.isTomorrow);
        const phoneNumber = ctx.phoneNumber;
        const finalResult = (0, bot_1.getControllerResult)(messages.getBlock(), session_1.SessionStates.ENTERING_BLOCK, reply_markups_1.default.enterBlock);
        if (phoneNumber) {
            yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "phone", phoneNumber);
            return finalResult;
        }
        if (!(0, helper_1.isNumber)(entry))
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.enterNumber, session_1.SessionStates.ENTERING_PHONE, reply_markups_1.default.enterPhoneButtons);
        if (!(0, index_1.isPhone)(entry))
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.phoneErr(entry), session_1.SessionStates.ENTERING_PHONE, reply_markups_1.default.enterPhoneButtons);
        yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "phone", entry);
        return finalResult;
    });
};
phoneController.type = controllerTypes_1.default.STATE;
phoneController.occasion = session_1.SessionStates.ENTERING_PHONE;
exports.default = phoneController;
