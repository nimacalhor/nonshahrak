import { RequestHandler } from "express";

const notFoundController: RequestHandler = function (req, res, next) {
  res.status(404).render("404");
};
export default notFoundController;
