"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_labels_1 = __importDefault(require("../../lib/constants/bot/button-labels"));
const date_helper_1 = require("../../lib/helper/date-helper");
const general_1 = require("../../lib/constants/bot/general");
const button_labels_2 = __importDefault(require("../../lib/constants/bot/button-labels"));
const general_2 = require("../../lib/constants/general");
const BOT_PROCESS_MESSAGE = "روند کاری بات";
const ORDER_BREAD = "سفارش نون 🍞";
const CHOOSE_ORDER_TYPE = "لطفا نوع سفارش را انتخاب کنید.";
const WEEKLY_ORDER_FOR = "سفارش هفتگی نون برای : \n";
const CHOOSE_BREAD_TYPE = "لطفا نون مورد نظر را انتخاب کنید.";
const ENTER_BREAD_AMOUNT = "لطفا تعداد نون را وارد کنید.";
const CHOOSE_WEEK_DAYS = `لطفا روز های هفته را انتخاب کنید.
نون شهرک هر هفته در روز های انتخاب شده نون را به شما میرساند.

از قسمت ${button_labels_1.default.MY_ORDERS} میتوانید سفارش هفتگی را تغییر دهید.`;
const ENTER_TIME = `لطفا تایم حدودی دریافت نون را وارد کنید.
( ساعت بین ${general_1.START_WORK_HOUR} تا ${general_1.END_WORK_HOUR} شب) 
ما سعی می‌کنیم راس تایم وارد شده سفارش شمارا انجام دهیم.

 مثال ورودی :
8
13:30
18:40
20`;
const ENTER_NAME = "لطفا نام خود را وارد کنید.";
const ENTER_PHONE = "لطفا شماره تماس خود را وارد کنید.";
const PROFILE_INFO = "مشخصات سفارش دهنده : \n \n";
const ADDRESS = "آدرس : \n \n";
const ENTER_BLOCK = "لطفا شماره بلوک خود را وارد کنید .";
const ENTER_ENTRANCE = "لطفا شماره ورودی بلوک را وارد کنید.";
const ENTER_FLOOR_LEVEL = "لطفا شماره طبقه خود را وارد کنید.";
const ENTER_UNIT = "لطفا شماره واحد خود را وارد کنید.";
const SELECTED = "انتخاب شد ✅ \n";
const DELETED = "حذف شد 🗑 \n";
const SELECTED_DAYS = "روز های انتخاب شده : \n";
const ENTER_NUMBER = "لطفا یک عدد انتخاب کنید.";
const ORDER_SUBMITTED = "سفارش شما ثبت شد ✅ \n";
const CLICK_FOR_PAYMENT = "برای پرداخت گزینه زیر را انتخاب کنید .";
const CHECK_MY_ORDERS_FOR_MORE = `شما می تواید از بخش ${button_labels_1.default.MY_ORDERS} سفارش های خود را مدیریت و پرداخت کنید .`;
const PURCHASE_SUCCESS = "پرداخت موفقیت آمیز بود .";
const PURCHASE_FAILED = "پرداخت ناموفق بود .";
class OrderMessages {
    get botProcessMessage() {
        return this.addBreak(BOT_PROCESS_MESSAGE);
    }
    get orderBread() {
        return this.addBreak(ORDER_BREAD + "\n\n" + CHOOSE_ORDER_TYPE);
    }
    constructor(session, tomorrow = false) {
        var _a;
        this.session = session;
        this.tomorrow = false;
        this.month = undefined;
        this.weekday = undefined;
        this.day = undefined;
        this.weekdays = undefined;
        this.tomorrow = tomorrow;
        if (!tomorrow && ((_a = session === null || session === void 0 ? void 0 : session.order) === null || _a === void 0 ? void 0 : _a.days))
            this.weekdays = session.order.days;
        if (!tomorrow)
            return;
        const { day, month, year, weekday } = (0, date_helper_1.getPersianDate)((0, date_helper_1.getTomorrowsDate)());
        this.month = month;
        this.weekday = weekday;
        this.day = day;
    }
    tomorrowBaseMessage() {
        return `سفارش نون برای فردا ${this.weekday}، ${this.day} ${this.month} ...\n\n`;
    }
    weekdaysListMessage() {
        return `${this.weekdays ? this.weekdays.join(" - ") + "\n\n" : ""}`;
    }
    addBreak(text) {
        return text + "\n\n";
    }
    getOrderMessage(endText) {
        let result;
        if (this.tomorrow) {
            result = `${this.tomorrowBaseMessage()}${endText}`;
        }
        else {
            result = `${WEEKLY_ORDER_FOR}${this.weekdaysListMessage()}${endText}`;
        }
        return this.addBreak(result);
    }
    getProfileMessage(endText) {
        return this.addBreak(`${PROFILE_INFO}${endText}`);
    }
    getAddressMessage(endText) {
        return this.addBreak(`${ADDRESS}${endText}`);
    }
    chooseWeekdays() {
        return this.addBreak(CHOOSE_WEEK_DAYS);
    }
    daySelected() {
        return this.addBreak(`${SELECTED}${SELECTED_DAYS}${this.weekdaysListMessage()}`);
    }
    dayDeleted() {
        return this.addBreak(`${DELETED}${SELECTED_DAYS}${this.weekdaysListMessage()}`);
    }
    chooseBreadType() {
        return this.getOrderMessage(CHOOSE_BREAD_TYPE);
    }
    enterBreadAmount() {
        return this.getOrderMessage(ENTER_BREAD_AMOUNT);
    }
    enterNumber() {
        return this.addBreak(`${ENTER_NUMBER}`);
    }
    enterTime() {
        return this.getOrderMessage(ENTER_TIME);
    }
    enterName() {
        return this.getProfileMessage(ENTER_NAME);
    }
    enterPhone() {
        return this.getProfileMessage(ENTER_PHONE);
    }
    getBlock() {
        return this.getAddressMessage(ENTER_BLOCK);
    }
    getEntrance() {
        return this.getAddressMessage(ENTER_ENTRANCE);
    }
    getFloorLevel() {
        return this.getAddressMessage(ENTER_FLOOR_LEVEL);
    }
    getUnit() {
        return this.getAddressMessage(ENTER_UNIT);
    }
    orderSubmitted(finalPurchase) {
        let result = `${ORDER_SUBMITTED}${this.tomorrow || finalPurchase
            ? `\n ${CLICK_FOR_PAYMENT}`
            : `${CHECK_MY_ORDERS_FOR_MORE}`}`;
        if (!finalPurchase)
            result = this.getOrderMessage(result);
        return result;
    }
    purchaseResult(success) {
        if (success)
            return `${PURCHASE_SUCCESS}`;
        else
            return `${PURCHASE_FAILED}`;
    }
    getProfileConfirmation(profileData) {
        const { name = "نا مشخص", phone = "نا مشخص", block = "نا مشخص", entrance = "نا مشخص", floor = "نا مشخض", unit = "نا مشخص", } = profileData;
        return this.addBreak(`تایید اطلاعات :
          
    نام : ${name}
    شماره تماس : ${phone} 
    
    بلوک : ${block}
    ورودی : ${entrance}
    طبقه : ${floor}
    واحد : ${unit}
    
    `);
    }
    getOrderConfirmation(userData) {
        var _a;
        const defaultOrder = {
            type: "نا مشخص",
            breadType: "نا مشخص",
            amount: 1,
            time: "نا مشخص",
            name: "نا مشخص",
            phone: "نا مشخص",
            block: "نا مشخص",
            entrance: "نا مشخص",
            floor: "نا مشخض",
            unit: "نا مشخص",
        };
        const { type = "نا مشخص", breadType = "نا مشخص", amount = 1, time = "نا مشخص", name = "نا مشخص", phone = "نا مشخص", block = "نا مشخص", entrance = "نا مشخص", floor = "نا مشخض", unit = "نا مشخص", } = ((_a = this.session) === null || _a === void 0 ? void 0 : _a.order) || defaultOrder;
        const data = {
            type,
            breadType,
            amount,
            time,
            name: userData ? userData.name : name,
            phone: userData ? userData.phone : phone,
            block: userData ? userData.block : block,
            entrance: userData ? userData.entrance : entrance,
            floor: userData ? userData.floor : floor,
            unit: userData ? userData.unit : unit,
            price: [button_labels_2.default.BARBARI].includes(breadType)
                ? amount * general_2.BreadPrices.BARBARI
                : amount * general_2.BreadPrices.SANQAK,
        };
        return this.addBreak(`سفارش شما : 

    نوع سفارش : ${data.type}
    نوع نوع : ${data.breadType}
    تعداد نون : ${data.amount}
    زمان دریافت : ${data.time}
    قیمت : ${data.price}
    
    نام : ${data.name}
    شماره تماس : ${data.phone} 
    
    بلوک : ${data.block}
    ورودی : ${data.entrance}
    طبقه : ${data.floor}
    واحد : ${data.unit}
    
    `);
    }
    getOrderString(order) {
        const { amount, breadType, dateString, time } = order;
        return `${amount} نون ${breadType} برای ${dateString}، ساعت ${time}.`;
    }
    purchaseNextWeek(orders) {
        return `پرداخت سفارش های
    ${orders.map((order) => this.getOrderString(order)).join("\n")}`;
    }
}
exports.default = OrderMessages;
