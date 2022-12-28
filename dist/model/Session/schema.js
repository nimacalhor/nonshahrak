"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_1 = require("../../lib/constants/bot/session");
const mongoose_1 = __importDefault(require("mongoose"));
const button_labels_1 = __importDefault(require("../../lib/constants/bot/button-labels"));
const bot_1 = require("../../lib/helper/bot");
const general_1 = require("../../lib/constants/general");
const query_helpers_1 = require("./query-helpers");
const sessionOrderSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
    },
    breadType: { type: String },
    amount: {
        type: Number,
        set: function (value) {
            if (!value)
                return value;
            if (!this.breadType)
                return value;
            if ((0, bot_1.compareEnum)(this.breadType, button_labels_1.default.BARBARI))
                this.price = general_1.BreadPrices.BARBARI * value;
            this.price = general_1.BreadPrices.SANQAK * value;
            return value;
        },
    },
    time: { type: String },
    name: { type: String },
    phone: { type: String },
    block: { type: Number },
    entrance: { type: String },
    floor: { type: Number },
    unit: { type: Number },
    days: { type: [String], default: [] },
    price: { type: Number },
});
const sessionSchema = new mongoose_1.default.Schema({
    userId: { type: Number },
    chatId: { type: Number },
    state: { type: String, default: session_1.SessionStates.UNDEFINED },
    order: { type: sessionOrderSchema },
    paymentMessageId: { type: Number },
    enteringProfile: { type: Boolean, default: false },
    thereIsPaymentMessage: { type: Boolean, default: false },
}, {
    query: { byUserId: query_helpers_1.byUserId, byCtx: query_helpers_1.byCtx },
});
exports.default = sessionSchema;
