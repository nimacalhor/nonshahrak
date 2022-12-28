"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byUserId = exports.tomorrows = void 0;
const date_helper_1 = require("../../lib/helper/date-helper");
const tomorrows = function () {
    const tomorrowsDate = (0, date_helper_1.getTomorrowsDate)();
    const tomorrowsDay = tomorrowsDate.getDate();
    const month = tomorrowsDate.getMonth();
    const query = this.find({
        day: tomorrowsDay,
        month,
    });
    return query;
};
exports.tomorrows = tomorrows;
const byUserId = function (userId) {
    const query = this.find({ userId });
    return query;
};
exports.byUserId = byUserId;
