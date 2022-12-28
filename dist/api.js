"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = require("./controller/api");
const paymentVerifyController_1 = __importDefault(require("./controller/api/paymentVerifyController"));
const api = (0, express_1.default)();
api.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
api.set("views", path_1.default.join(__dirname, "../views"));
api.set("view engine", "ejs");
api.use("/payment-verify", paymentVerifyController_1.default);
api.use(api_1.notFoundController);
exports.default = api;
