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
const button_labels_1 = __importDefault(require("../../../lib/constants/bot/button-labels"));
const AlertMessages_1 = __importDefault(require("../../../view/messages/AlertMessages"));
const entranceController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const messages = new messages_1.default(ctx.session, ctx.isTomorrow);
        if (!(0, helper_1.isNumber)(entry) && !(0, bot_1.compareEnum)(entry, button_labels_1.default.LONE_ENTRANCE))
            return (0, bot_1.getControllerResult)(AlertMessages_1.default.chooseFromButtons, session_1.SessionStates.ENTERING_ENTRANCE, reply_markups_1.default.enterEntrance);
        yield (0, bot_1.setOrderSession)(ctx, ctx.userId, "entrance", entry);
        return (0, bot_1.getControllerResult)(messages.getFloorLevel(), session_1.SessionStates.ENTERING_FLOOR_LEVEL, reply_markups_1.default.enterFloorButtons);
    });
};
entranceController.type = controllerTypes_1.default.STATE;
entranceController.occasion = session_1.SessionStates.ENTERING_ENTRANCE;
exports.default = entranceController;
