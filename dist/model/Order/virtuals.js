"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateString = void 0;
const date_helper_1 = require("../../lib/helper/date-helper");
exports.dateString = {
    get: function () {
        const { day, month, weekday } = (0, date_helper_1.getPersianDate)(this.date);
        return `${weekday}، ${day.replace(/^0/, "")}ام ${month}`;
    },
};
