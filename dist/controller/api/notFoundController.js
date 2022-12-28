"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundController = function (req, res, next) {
    res.status(404).render("404");
};
exports.default = notFoundController;
