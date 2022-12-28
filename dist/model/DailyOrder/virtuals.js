"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateStringVirtual = void 0;
const date_constants_1 = require("../../lib/constants/date-constants");
exports.dateStringVirtual = {
    get: function () {
        const daysString = this.days.map((d) => date_constants_1.PERSIAN_WEEKDAYS.filter((d) => d !== "_")[d]);
        return daysString.join(" ، ").replace(/،$/gm, "و") + " ها";
    },
};
