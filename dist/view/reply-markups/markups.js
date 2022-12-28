"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchingDailyOrdersButtons = exports.dailyOrderButtons = exports.paymentButtons = exports.paymentLink = exports.confirmOrderButtons = exports.myOrdersButtons = exports.enterUnitButtons = exports.enterFloorButtons = exports.enterPlaqueButtons = exports.enterEntrance = exports.enterBlock = exports.enterPhoneButtons = exports.enterNameButtons = exports.enterTimeButtons = exports.breadAmountButtons = exports.profileConfirmButtons = exports.onlyReturnButton = exports.breadTypeButtons = exports.orderTypeButtons = exports.chooseWeekdaysButtons = exports.returnButton = exports.mainButtons = void 0;
const button_labels_1 = __importDefault(require("../../lib/constants/bot/button-labels"));
const date_constants_1 = require("../../lib/constants/date-constants");
const date_helper_1 = require("../../lib/helper/date-helper");
const bot_1 = require("../../lib/helper/bot");
exports.mainButtons = {
    resize_keyboard: true,
    keyboard: [
        [
            {
                text: button_labels_1.default.MY_ORDERS,
            },
            {
                text: button_labels_1.default.ORDER_BREAD,
            },
        ],
        [{ text: button_labels_1.default.MY_DAILY_ORDERS }],
    ],
};
exports.returnButton = {
    text: button_labels_1.default.RETURN,
};
const getButtonWeekdayText = (num, days) => `${days.includes(date_constants_1.PERSIAN_WEEKDAYS[num]) ? "حذف" : ""} ${date_constants_1.PERSIAN_WEEKDAYS[num]}`;
const chooseWeekdaysButtons = (days) => ({
    resize_keyboard: true,
    selective: true,
    keyboard: [
        [
            { text: getButtonWeekdayText(2, days) },
            { text: getButtonWeekdayText(1, days) },
            { text: getButtonWeekdayText(7, days) },
        ],
        [
            { text: getButtonWeekdayText(5, days) },
            { text: getButtonWeekdayText(4, days) },
            { text: getButtonWeekdayText(3, days) },
        ],
        [{ text: getButtonWeekdayText(6, days) }],
        [exports.returnButton, { text: button_labels_1.default.CONFIRM }],
    ],
});
exports.chooseWeekdaysButtons = chooseWeekdaysButtons;
exports.orderTypeButtons = {
    resize_keyboard: true,
    keyboard: [
        [
            {
                text: button_labels_1.default.ORDER_TYPE_DAILY,
            },
            {
                text: button_labels_1.default.ORDER_TYPE_TOMORROW,
            },
        ],
        [exports.returnButton],
    ],
};
exports.breadTypeButtons = {
    resize_keyboard: true,
    keyboard: [
        [
            {
                text: button_labels_1.default.BARBARI,
            },
            {
                text: button_labels_1.default.SANAQAK,
            },
        ],
        [exports.returnButton],
    ],
};
exports.onlyReturnButton = {
    resize_keyboard: true,
    keyboard: [[exports.returnButton]],
};
exports.profileConfirmButtons = {
    resize_keyboard: true,
    keyboard: [
        [
            {
                text: button_labels_1.default.CONTINUE_WITH_THIS_INFO,
            },
            {
                text: button_labels_1.default.ENTER_PROFILE,
            },
        ],
        [exports.returnButton],
    ],
};
exports.breadAmountButtons = exports.onlyReturnButton;
exports.enterTimeButtons = exports.onlyReturnButton;
exports.enterNameButtons = exports.onlyReturnButton;
exports.enterPhoneButtons = {
    resize_keyboard: true,
    keyboard: [
        [{ text: button_labels_1.default.MY_NUMBER, request_contact: true }],
        [exports.returnButton],
    ],
};
exports.enterBlock = exports.onlyReturnButton;
exports.enterEntrance = {
    resize_keyboard: true,
    keyboard: [[{ text: button_labels_1.default.LONE_ENTRANCE }], [exports.returnButton]],
};
exports.enterPlaqueButtons = exports.onlyReturnButton;
exports.enterFloorButtons = exports.onlyReturnButton;
exports.enterUnitButtons = exports.onlyReturnButton;
exports.myOrdersButtons = exports.onlyReturnButton;
exports.confirmOrderButtons = {
    resize_keyboard: true,
    keyboard: [
        [{ text: button_labels_1.default.CANCEL_ORDER }, { text: button_labels_1.default.CONFIRM }],
        [exports.returnButton],
    ],
};
const paymentLink = (url) => ({
    resize_keyboard: true,
    inline_keyboard: [
        [
            {
                text: button_labels_1.default.PAY,
                url,
            },
        ],
    ],
});
exports.paymentLink = paymentLink;
exports.paymentButtons = {
    resize_keyboard: true,
    keyboard: [[{ text: button_labels_1.default.DONE }]],
};
const getDateButton = (date) => ({
    text: (0, date_helper_1.getDateMessage)(date),
    callback_data: `dailyOrder_${date.getDay()}_${date.getTime()}`,
});
const dailyOrderButtons = (dates) => ({
    resize_keyboard: true,
    inline_keyboard: [
        ...(0, bot_1.divideArray)(dates.map(getDateButton)),
        [
            {
                text: button_labels_1.default.PURCHASE_NEXT_WEEK,
                callback_data: `dailyOrder_purchaseNextWeek`,
            },
        ],
    ],
});
exports.dailyOrderButtons = dailyOrderButtons;
exports.watchingDailyOrdersButtons = exports.onlyReturnButton;
