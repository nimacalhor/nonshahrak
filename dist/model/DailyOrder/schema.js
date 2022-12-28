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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const query_helpers_1 = require("./query-helpers");
const virtuals_1 = require("./virtuals");
const methods_1 = require("./methods");
const dailyOrderSchema = new mongoose_1.default.Schema({
    days: { type: [Number], default: [] },
    amount: { type: Number },
    breadType: { type: String },
    time: { type: String },
    user: {
        ref: "User",
        type: mongoose_1.Types.ObjectId,
    },
    userId: { type: Number },
    duplicated: { type: Boolean, default: false },
}, {
    query: { byUserId: query_helpers_1.byUserId, inDay: query_helpers_1.inDay },
    methods: { getDates: methods_1.getDates },
});
dailyOrderSchema.virtual("dateString").get(virtuals_1.dateStringVirtual.get);
exports.default = dailyOrderSchema;
