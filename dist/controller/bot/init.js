"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.init = exports.runController = void 0;
const session_1 = require("./../../lib/constants/bot/session");
const controllerTypes_1 = __importDefault(require("../../lib/constants/controllerTypes"));
const commandControllers = __importStar(require("./command-controllers"));
const keywordControllers = __importStar(require("./keyword-controllers"));
const stateControllers = __importStar(require("./state-controllers"));
const returnControllers = __importStar(require("./return-controllers"));
const queryControllers = __importStar(require("./query-controllers"));
const Session_1 = __importDefault(require("../../model/Session"));
const bot_1 = require("../../lib/helper/bot");
const commandControllersList = {};
const keywordControllersList = {};
const returnControllersList = {};
const stateControllersList = {};
const queryControllersList = {};
const allControllers = (0, bot_1.getAllControllersArr)(commandControllers, keywordControllers, stateControllers, returnControllers, queryControllers);
const initControllers = () => allControllers.forEach((c) => {
    const { type, occasion } = c;
    if ((0, bot_1.compareEnum)(type, controllerTypes_1.default.COMMAND))
        commandControllersList[occasion] = c;
    if ((0, bot_1.compareEnum)(type, controllerTypes_1.default.KEYWORD))
        keywordControllersList[occasion] = c;
    if ((0, bot_1.compareEnum)(type, controllerTypes_1.default.QUERY))
        queryControllersList[occasion] = c;
    if ((0, bot_1.compareEnum)(type, controllerTypes_1.default.RETURN))
        returnControllersList[occasion] = c;
    if ((0, bot_1.compareEnum)(type, controllerTypes_1.default.STATE))
        stateControllersList[occasion] = c;
});
const runController = (ctx, c) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield c(ctx);
    if (!result)
        return;
    const { message, replyMarkup, state, saveOnSession } = result;
    const session = yield Session_1.default.findOne({ userId: (0, bot_1.getUserId)(ctx) });
    if (session) {
        if ((0, bot_1.compareEnum)(state, session_1.SessionStates.UNDEFINED)) {
            yield session.remove();
        }
        else {
            session.state = state;
            yield session.save();
        }
    }
    else {
        const userId = (0, bot_1.getUserId)(ctx);
        const chatId = (0, bot_1.getChatId)(ctx);
        yield Session_1.default.create({ userId, chatId, state, order: {} });
    }
    const replyMessage = yield (0, bot_1.reply)(ctx, message, replyMarkup);
    if (saveOnSession && session) {
        session.paymentMessageId = replyMessage.message_id;
        session.save();
    }
});
exports.runController = runController;
const initCommands = (bot) => Object.entries(commandControllersList).forEach(([command, controller]) => bot.command(command, (ctx) => (0, exports.runController)(ctx, controller)));
const init = function (bot) {
    initControllers();
    initCommands(bot);
    return new (class {
        constructor() {
            this.keywordControllersList = keywordControllersList;
            this.returnControllersList = returnControllersList;
            this.stateControllersList = stateControllersList;
            this.queryControllersList = queryControllersList;
        }
    })();
};
exports.init = init;
