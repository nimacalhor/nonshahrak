"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inDay = exports.byUserId = void 0;
const query_helper_factory_1 = require("../query-helper-factory");
exports.byUserId = (0, query_helper_factory_1.getUserByIdQHelper)();
const inDay = function (day) {
    return this.findOne({ days: day });
};
exports.inDay = inDay;
