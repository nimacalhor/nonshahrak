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
exports.queryMw = exports.keywordMw = exports.stateMw = exports.returnMw = exports.setIsOrderTypeTomorrow = exports.setQuery = exports.validateStateExistence = exports.setSession = exports.setUserId = exports.setEntry = void 0;
const bot_1 = require("./lib/helper/bot");
const AlertMessages_1 = __importDefault(require("./view/messages/AlertMessages"));
const Session_1 = __importDefault(require("./model/Session"));
const button_labels_1 = __importDefault(require("./lib/constants/bot/button-labels"));
const keywords_1 = __importDefault(require("./lib/constants/bot/keywords"));
const setEntry = function (ctx, next) {
    var _a, _b;
    const entry = (0, bot_1.validateCtxText)(ctx);
    const phoneNumber = (_b = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.contact) === null || _b === void 0 ? void 0 : _b.phone_number;
    if (entry || phoneNumber) {
        ctx.entry = entry || "";
        ctx.phoneNumber = phoneNumber;
        return next();
    }
    return ctx.reply(AlertMessages_1.default.addStart(AlertMessages_1.default.noEntry));
};
exports.setEntry = setEntry;
const setUserId = function (ctx, next) {
    const userId = (0, bot_1.getUserId)(ctx);
    if (userId) {
        ctx.userId = userId;
        return next();
    }
    return ctx.reply(AlertMessages_1.default.addStart(AlertMessages_1.default.noUserIdFound));
};
exports.setUserId = setUserId;
const wentWrongMessage = AlertMessages_1.default.addStart(AlertMessages_1.default.somethingWentWrong);
const setSession = function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield Session_1.default.find().byUserId(ctx.userId);
        if (session) {
            ctx.session = session;
            return next();
        }
        return ctx.reply(wentWrongMessage);
    });
};
exports.setSession = setSession;
const validateStateExistence = function (ctx, next) {
    const state = ctx.session.state;
    if (state) {
        return next();
    }
    return ctx.reply(wentWrongMessage);
};
exports.validateStateExistence = validateStateExistence;
const setQuery = function (ctx, next) {
    const queryData = (0, bot_1.validateCtxQueryData)(ctx);
    const queryTitle = (0, bot_1.getQueryTitle)(queryData);
    ctx.queryData = queryData || undefined;
    ctx.queryTitle = queryTitle || undefined;
    return next();
};
exports.setQuery = setQuery;
const setIsOrderTypeTomorrow = function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isTomorrow = yield (0, bot_1.isOrderTypeTomorrow)(ctx.userId);
        ctx.isTomorrow = isTomorrow;
        return next();
    });
};
exports.setIsOrderTypeTomorrow = setIsOrderTypeTomorrow;
const returnMw = (list, runController) => function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const { state } = ctx.session;
        if (!(0, bot_1.compareEnum)(entry, button_labels_1.default.RETURN))
            return next();
        const controller = list[state];
        if (!controller)
            return next();
        yield runController(ctx, controller);
    });
};
exports.returnMw = returnMw;
const stateMw = (list, runController) => function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        const phoneNumber = ctx.phoneNumber;
        const { state } = ctx.session;
        const controller = list[state];
        if (!controller)
            return next();
        yield runController(ctx, controller);
    });
};
exports.stateMw = stateMw;
const keywordMw = (list, runController) => function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = ctx.entry;
        if (!(0, bot_1.compareEnum)(entry, ...Object.values(keywords_1.default)))
            return next();
        const controller = list[entry];
        if (!controller)
            return next();
        yield runController(ctx, controller);
    });
};
exports.keywordMw = keywordMw;
const queryMw = (list, runController) => function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryTitle = ctx.queryTitle;
        if (!queryTitle)
            return next();
        const controller = list[queryTitle];
        if (!controller)
            return next();
        yield runController(ctx, controller);
    });
};
exports.queryMw = queryMw;
