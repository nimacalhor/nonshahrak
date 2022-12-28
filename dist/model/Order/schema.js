"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_labels_1 = __importDefault(require("../../lib/constants/bot/button-labels"));
const general_1 = require("../../lib/constants/general");
const bot_1 = require("../../lib/helper/bot");
const date_helper_1 = require("../../lib/helper/date-helper");
const mongoose_1 = __importDefault(require("mongoose"));
const query_helpers_1 = require("./query-helpers");
const virtuals_1 = require("./virtuals");
const orderSchema = new mongoose_1.default.Schema({
    breadType: {
        type: String,
        enum: [button_labels_1.default.BARBARI, button_labels_1.default.SANAQAK],
    },
    amount: { type: Number },
    time: { type: String },
    userId: { type: Number, index: true },
    user: {
        ref: "User",
        type: mongoose_1.default.SchemaTypes.ObjectId,
    },
    price: {
        type: Number,
        default: function () {
            if ((0, bot_1.compareEnum)(this.breadType, button_labels_1.default.BARBARI))
                return this.amount * general_1.BreadPrices.BARBARI;
            else
                return this.amount * general_1.BreadPrices.SANQAK;
        },
    },
    date: {
        type: Date,
        default: (0, date_helper_1.getTomorrowsDate)(),
        set: function (value) {
            this.day = value.getDate();
            this.month = value.getMonth();
            this.year = value.getFullYear();
            return value;
        },
    },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number },
    authority: { type: String, default: "" },
    paid: { type: Boolean, default: false },
    refId: { type: Number },
    duplicated: { type: Boolean, default: false },
}, {
    query: {
        byUserId: query_helpers_1.byUserId,
        tomorrows: query_helpers_1.tomorrows,
    },
});
orderSchema.virtual("dateString").get(virtuals_1.dateString.get);
exports.default = orderSchema;
