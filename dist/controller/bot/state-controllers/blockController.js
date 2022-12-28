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
const helper_1 = require("../../../lib/helper");
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const blockController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const messages = new messages_1.default(ctx.session, ctx.isTomorrow);
        if (!(0, helper_1.isNumber)(entry))
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.enterNumber, session_1.SessionStates.ENTERING_BLOCK, reply_markups_1.default.enterBlock);
        yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "block", entry);
        return (0, bot_1.getControllerResult)(messages.getEntrance(), session_1.SessionStates.ENTERING_ENTRANCE, reply_markups_1.default.enterEntrance);
    });
};
blockController.type = controllerTypes_1.default.STATE;
blockController.occasion = session_1.SessionStates.ENTERING_BLOCK;
exports.default = blockController;
