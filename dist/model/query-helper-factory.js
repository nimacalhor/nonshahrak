"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdQHelper = void 0;
const getUserByIdQHelper = function () {
    return function (userId) {
        const query = this.findOne({ userId });
        return query;
    };
};
exports.getUserByIdQHelper = getUserByIdQHelper;
