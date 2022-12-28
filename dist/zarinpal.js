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
exports.verifyPayment = exports.paymentRequest = void 0;
const zarinpal_checkout_1 = __importDefault(require("zarinpal-checkout"));
const cardNumber = process.env.CARD_NUMBER;
const sandBox = process.env.NODE_ENV === "development";
const callbackUrl = sandBox
    ? process.env.CALLBACK_URL_DEV
    : process.env.CALLBACK_URL_PRO;
const email = process.env.EMAIL;
const mobile = process.env.MOBILE;
const payment = zarinpal_checkout_1.default.create(cardNumber, sandBox);
const paymentRequest = function (price) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield payment.PaymentRequest({
                Amount: price,
                CallbackURL: callbackUrl,
                Description: "پرداخت سفارش از نونشهرک",
                Email: email,
                Mobile: mobile,
            });
            if (response.status === 100)
                return response;
            console.log({ response });
            return false;
        }
        catch (error) {
            console.log({ error });
            return false;
        }
    });
};
exports.paymentRequest = paymentRequest;
const verifyPayment = function (Amount, Authority) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { RefID, status } = yield payment.PaymentVerification({
                Amount,
                Authority,
            });
            if (status === -21)
                return false;
            return parseInt(RefID + "");
        }
        catch (error) {
            return false;
        }
    });
};
exports.verifyPayment = verifyPayment;
