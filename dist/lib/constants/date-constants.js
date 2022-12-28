"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEEKDAYS = exports.PERSIAN_WEEKDAYS_AS_CONST = exports.DELETE_PERSIAN_WEEKDAYS = exports.INDEXED_PERSIAN_WEEKDAYS = exports.PERSIAN_WEEKDAYS = void 0;
exports.PERSIAN_WEEKDAYS = [
    "_",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
];
exports.INDEXED_PERSIAN_WEEKDAYS = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشبه",
    "پنجشنبه",
    "جمعه",
];
exports.DELETE_PERSIAN_WEEKDAYS = exports.PERSIAN_WEEKDAYS.filter((d) => d !== "_").map((d) => `حذف ${d}`);
exports.PERSIAN_WEEKDAYS_AS_CONST = [
    "_",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
];
exports.WEEKDAYS = [
    "_",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
