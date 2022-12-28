"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersianDate = exports.getTomorrowsDate = exports.getNextWeekDates = exports.getDateMessage = exports.getNextDate = void 0;
const date_constants_1 = require("../constants/date-constants");
const getTomorrowsDate = () => {
    const [todaysDate, tomorrowsDate] = [new Date(), new Date()];
    tomorrowsDate.setDate(todaysDate.getDate() + 1);
    tomorrowsDate.setHours(0, 0, 0, 0);
    return tomorrowsDate;
};
exports.getTomorrowsDate = getTomorrowsDate;
const getPersianDate = (date) => {
    const [day, month, year] = new Intl.DateTimeFormat("fa-IR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    })
        .format(date)
        .split(" ");
    const weekday = date_constants_1.PERSIAN_WEEKDAYS[date.getDay() + 1];
    return { day: day.replace(/^۰/g, ""), weekday, month, year };
};
exports.getPersianDate = getPersianDate;
const getNextDate = function (day, nextWeek) {
    const date = new Date();
    const now = date.getDay();
    let diff = day - now;
    if (!nextWeek)
        diff = diff < 1 ? 7 + diff : diff;
    else
        diff = diff + 7;
    const nextDayTimestamp = date.getTime() + 1000 * 60 * 60 * 24 * diff;
    return new Date(nextDayTimestamp);
};
exports.getNextDate = getNextDate;
const getDateMessage = function (date) {
    const { day, weekday, month } = getPersianDate(date);
    return `${weekday} ${day}ام ${month}`;
};
exports.getDateMessage = getDateMessage;
const getNextWeekDates = function (days) {
    const date = new Date();
    const weekday = date.getDay();
    return days.map((d) => {
        return (0, exports.getNextDate)(d, true);
    });
};
exports.getNextWeekDates = getNextWeekDates;
