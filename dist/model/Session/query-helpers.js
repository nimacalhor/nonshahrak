"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byCtx = exports.byUserId = void 0;
const query_helper_factory_1 = require("../query-helper-factory");
const bot_1 = require("../../lib/helper/bot");
exports.byUserId = (0, query_helper_factory_1.getUserByIdQHelper)();
const byCtx = function (ctx) {
    const query = this.findOne({ userId: (0, bot_1.getUserId)(ctx) });
    return query;
};
exports.byCtx = byCtx;
