"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDates = void 0;
const date_helper_1 = require("../../lib/helper/date-helper");
const getDates = function () {
    const dates = [...this.days].map((d) => (0, date_helper_1.getNextDate)(d));
    return dates;
};
exports.getDates = getDates;
