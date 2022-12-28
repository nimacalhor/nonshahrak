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
const messages_1 = __importDefault(require("../../../view/messages"));
const reply_markups_1 = __importDefault(require("../../../view/reply-markups"));
const session_1 = require("../../../lib/constants/bot/session");
const keywords_1 = __importDefault(require("../../../lib/constants/bot/keywords"));
const controllerTypes_1 = __importDefault(require("../../../lib/constants/controllerTypes"));
const orderBreadController = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = new messages_1.default(null)
            .orderBread;
        return {
            message,
            replyMarkup: reply_markups_1.default.orderTypeButtons,
            state: session_1.SessionStates.ENTERING_ORDER_TYPE,
        };
    });
};
orderBreadController.occasion = keywords_1.default.ORDER_BREAD;
orderBreadController.type = controllerTypes_1.default.KEYWORD;
exports.default = orderBreadController;
