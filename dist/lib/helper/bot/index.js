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
exports.divideArray = exports.validateState = exports.daysToIndex = exports.calcPrice = exports.isPhone = exports.getChatId = exports.getUsername = exports.getUserId = exports.getControllerResult = exports.reply = exports.getQueryTitle = exports.validateCtxQueryData = exports.validateCtxText = exports.getAllControllersArr = exports.isOrderTypeTomorrow = exports.compareEnum = exports.setOrderSession = void 0;
const date_constants_1 = require("../../constants/date-constants");
const button_labels_1 = __importDefault(require("../../constants/bot/button-labels"));
const general_1 = require("../../constants/bot/general");
const queries_1 = __importDefault(require("../../constants/bot/queries"));
const general_2 = require("../../constants/general");
const Session_1 = __importDefault(require("../../../model/Session"));
const setOrderSession = (ctx, userId, key, value) => __awaiter(void 0, void 0, void 0, function* () {
    const session = (yield Session_1.default.find().byUserId(userId));
    if (typeof key === "string") {
        session.order[key] = value;
        const newSession = yield session.save();
        ctx.session = newSession;
        ctx.isTomorrow = (0, exports.compareEnum)(newSession.order.type, button_labels_1.default.ORDER_TYPE_TOMORROW);
        return session;
    }
    if (Array.isArray(key) && key.length > 0) {
        key.forEach((k) => (session.order[k] = value));
        const newSession = yield session.save();
        ctx.session = newSession;
        ctx.isTomorrow = (0, exports.compareEnum)(newSession.order.type, button_labels_1.default.ORDER_TYPE_TOMORROW);
        return session;
    }
    session.order = { days: [] };
    const newSession = yield session.save();
    ctx.session = newSession;
    ctx.isTomorrow = (0, exports.compareEnum)(newSession.order.type, button_labels_1.default.ORDER_TYPE_TOMORROW);
    return session;
});
exports.setOrderSession = setOrderSession;
const compareEnum = (text, ...enums) => enums.includes(text);
exports.compareEnum = compareEnum;
const isOrderTypeTomorrow = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield Session_1.default.find().byUserId(userId);
    if (!session || !session.order)
        return false;
    return (0, exports.compareEnum)(session.order.type, button_labels_1.default.ORDER_TYPE_TOMORROW);
});
exports.isOrderTypeTomorrow = isOrderTypeTomorrow;
const getAllControllersArr = (...modules) => modules.map((m) => Object.values(m)).flat();
exports.getAllControllersArr = getAllControllersArr;
const validateCtxText = (ctx) => {
    if (!ctx.message)
        return false;
    const { text } = ctx.message;
    if (!text)
        return false;
    return text;
};
exports.validateCtxText = validateCtxText;
const validateCtxQueryData = (ctx) => {
    if (!ctx.callbackQuery)
        return false;
    const { data } = ctx.callbackQuery;
    if (!data)
        return false;
    return data;
};
exports.validateCtxQueryData = validateCtxQueryData;
const getQueryTitle = (query) => {
    if (!query)
        return false;
    const matchResult = query.match(Object.values(queries_1.default).join(" "));
    if (!matchResult)
        return false;
    return matchResult[0];
};
exports.getQueryTitle = getQueryTitle;
const reply = (ctx, message, reply_markup) => ctx.reply(message, { reply_markup });
exports.reply = reply;
const getControllerResult = (message, state, replyMarkup, saveOnSession) => ({ message, state, replyMarkup, saveOnSession });
exports.getControllerResult = getControllerResult;
const getUserId = (ctx) => {
    var _a, _b;
    const id = ctx.message ? (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id : (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id;
    if (typeof id === "number")
        return parseInt(id + "");
    return id;
};
exports.getUserId = getUserId;
const getUsername = (ctx) => { var _a, _b; return ctx.message ? (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.username : (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username; };
exports.getUsername = getUsername;
const getChatId = (ctx) => { var _a; return ctx.chat ? ctx.chat.id : (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.chat.id; };
exports.getChatId = getChatId;
const isPhone = (phone) => phone.trim().length === general_1.VALID_PHONE_LENGTH && phone.startsWith("09");
exports.isPhone = isPhone;
const calcPrice = (amount, bread) => {
    if ((0, exports.compareEnum)(bread, button_labels_1.default.BARBARI))
        return general_2.BreadPrices.BARBARI * amount;
    else
        return general_2.BreadPrices.SANQAK * amount;
};
exports.calcPrice = calcPrice;
const daysToIndex = (days = []) => [...days].map((d) => date_constants_1.PERSIAN_WEEKDAYS.filter((d) => d !== "_").indexOf(d));
exports.daysToIndex = daysToIndex;
const validateState = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield Session_1.default.find().byCtx(ctx);
    if (!session)
        return false;
    return session.state;
});
exports.validateState = validateState;
const divideArray = function (arr, chunkSize = general_1.DAILY_ORDER_ROW_BUTTON_AMOUNT) {
    const resultArr = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        resultArr.push(chunk);
    }
    return resultArr;
};
exports.divideArray = divideArray;
