"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("../../lib/constants/bot"));
const CHOOSE_FROM_BUTTONS = "لطفا یکی از دکمه های زیر را انتخاب کنید.";
const TIME_PERIOD_ERR = `لطفا ساعتی بین ${bot_1.default.START_WORK_HOUR} و ${bot_1.default.END_WORK_HOUR} انتخاب کنید .`;
const SELECT_DAY = "لطفا چند روز از هفته را انتخاب کنید.";
const LONG_ENTRY = "لطفا متنی کوتاه تر وارد کنید.";
const PHONE_LENGTH_ERR = "شماره تماس کوتاه و یا بلند است.";
const PHONE_INVALID = "شماره تماس صحیح نمی باشد.";
const ENTER_NUMBER = "لطفا یک عدد وارد کنید.";
const PAYMENT_REQ_FAILED = "پرداخت شما ناموفق بود 😢 لطفا دوباره امتحان کنید";
const TIME_INPUT_FORMAT_ERR = `فرمت ورودی صحیح نمی باشد ⚠`;
const NO_SUBMITTED_ORDER = "شما هیچ سفارش ثبت شده ای ندارید ❕";
const NO_DAILY_ORDER = "شما سفارش هفتگی ای ثبت نکرده اید";
const ORDER_HAS_BEEN_PURCHASED = "این سفارش قبلا پرداخت شده .";
const ORDERS_HAS_BEEN_PURCHASED = "این سفارش ها قبلا پرداخت شده اند .";
const NO_ENTRY = "هیچ ورودی ای یافت نشد .";
const NO_USER_ID_FOUND = "userId شما پیدا نشد .";
const SM_WENT_WRONG = "something went wrong";
const TOMORROW_ORDER_EXISTS = "از قبل سفارشی برای فردا دارید !";
const DAILY_ORDER_EXISTS = "از قبل سفارش هفتگی دارید .";
const NEW_ORDER_INFO = "با ثبت سفارش ، سفارش جدید جایگذین قبلی می شود";
class AlertMessages {
    constructor() {
        this.chooseFromButtons = CHOOSE_FROM_BUTTONS;
        this.timePeriodErr = TIME_PERIOD_ERR;
        this.noDaySelected = SELECT_DAY;
        this.longEntry = LONG_ENTRY;
        this.enterNumber = ENTER_NUMBER;
        this.paymentReqErr = PAYMENT_REQ_FAILED;
        this.timeFormatError = TIME_INPUT_FORMAT_ERR;
        this.noSubmittedOrder = NO_SUBMITTED_ORDER;
        this.noDailyOrder = NO_DAILY_ORDER;
        this.noEntry = NO_ENTRY;
        this.noUserIdFound = NO_USER_ID_FOUND;
        this.somethingWentWrong = SM_WENT_WRONG;
        this.orderHasBeenPurchased = (weekly) => weekly ? ORDERS_HAS_BEEN_PURCHASED : ORDER_HAS_BEEN_PURCHASED;
        this.addStart = (text) => `${text}\n\n/start`;
        this.orderExists = (isTomorrow) => `${isTomorrow ? TOMORROW_ORDER_EXISTS : DAILY_ORDER_EXISTS} \n ${NEW_ORDER_INFO}`;
    }
    phoneErr(entry) {
        if (entry.startsWith("09"))
            return PHONE_INVALID;
        else
            return PHONE_LENGTH_ERR;
    }
}
exports.default = new AlertMessages();
