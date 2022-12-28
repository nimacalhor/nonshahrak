"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = mongoose_1.default.model("Order", schema_1.default, "Order");
mongoose_1.default.model;
