"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.checkTextLength = void 0;
const checkTextLength = (str, num) => str.length <= num;
exports.checkTextLength = checkTextLength;
const isNumber = (val) => !isNaN(parseFloat(val));
exports.isNumber = isNumber;
