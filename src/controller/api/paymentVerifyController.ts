import Order from "@src/model/Order";
import { verifyPayment } from "@src/zarinpal";
import { RequestHandler } from "express";
import {} from "zarinpal-checkout";
import { Order as TOrder } from "@t/order";

interface ReqQuery {
  Authority: string;
  Status: "OK" | "NOK";
}

const paymentVerifyController: RequestHandler<any, any, any, ReqQuery> =
  async function (req, res, next) {
    const { Authority, Status } = req.query;
    const order = await Order.findOne({
      authority: Authority,
      paid: false,
    }).populate("user");

    if (!order) return res.redirect("/404");
    const response = await verifyPayment(
      (order as unknown as TOrder).price,
      Authority
    );
    if (Status === "OK" && typeof response === "number") {
      order.paid = true;
      order.authority = "";
      order.refId = response;
      order.save();
    } else {
    }

    res.render("payment-result", {
      order,
      response: response,
      status: Status,
    });
  };

export default paymentVerifyController;
