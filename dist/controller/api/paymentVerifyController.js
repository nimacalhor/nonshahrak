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
const Order_1 = __importDefault(require("../../model/Order"));
const zarinpal_1 = require("../../zarinpal");
const bot_1 = __importDefault(require("../../bot"));
const messages_1 = __importDefault(require("../../view/messages"));
const Session_1 = __importDefault(require("../../model/Session"));
const paymentVerifyController = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let success;
        const { Authority, Status } = req.query;
        const orders = yield Order_1.default.find({
            authority: Authority,
            paid: false,
        });
        if (!orders.length)
            return res.redirect("/404");
        const order = orders[0];
        const [duplicatedOrders, session] = yield Promise.all([
            Order_1.default.find().byUserId(order.userId).where("duplicated").equals(true),
            Session_1.default.find().byUserId(order.userId),
        ]);
        if (!session)
            return res.redirect("/404");
        const response = yield (0, zarinpal_1.verifyPayment)(order.price, Authority);
        if (Status === "OK" && response) {
            orders.forEach((order) => {
                order.paid = true;
                order.authority = "";
                order.refId = response;
                order.save();
            });
            duplicatedOrders.forEach((order) => order.remove());
            success = true;
            if (session.paymentMessageId) {
                bot_1.default.telegram.deleteMessage(session.chatId, session.paymentMessageId);
                session.paymentMessageId = undefined;
                yield session.save();
            }
        }
        else {
            success = false;
            duplicatedOrders.forEach((order) => {
                order.duplicated = false;
                order.save();
            });
        }
        const messages = new messages_1.default(session);
        const message = messages.purchaseResult(success);
        bot_1.default.telegram.sendMessage(session === null || session === void 0 ? void 0 : session.chatId, message);
        res.render("payment-result", {
            order,
            response: response,
            status: Status,
        });
    });
};
exports.default = paymentVerifyController;
