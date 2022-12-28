"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const query_helpers_1 = require("./query-helpers");
const userSchema = new mongoose_1.default.Schema({
    name: { type: String },
    phone: { type: String },
    userId: { type: Number, index: true },
    block: { type: Number },
    entrance: { type: mongoose_1.default.Schema.Types.Mixed, default: "loneEntrance" },
    floor: { type: Number },
    unit: { type: Number },
    username: { type: String },
}, {
    query: { byUserId: query_helpers_1.byUserId },
});
exports.default = userSchema;
