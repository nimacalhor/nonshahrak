import express from "express";
import path from "path";
import { notFoundController } from "./controller/api";
import paymentVerifyController from "./controller/api/paymentVerifyController";

const api = express();

api.use(express.static(path.join(__dirname, "../public")));
api.set("views", path.join(__dirname, "../views"));
api.set("view engine", "ejs");

api.use("/payment-verify", paymentVerifyController);
api.use(notFoundController);

export default api;
