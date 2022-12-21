import Order from "@src/model/Order";
import { verifyPayment } from "@src/zarinpal";
import { RequestHandler } from "express";
import {} from "zarinpal-checkout";
import { Order as TOrder } from "@t/order";
import bot from "@src/bot";
import OrderMessages from "@src/view/messages";
import Session from "@src/model/Session";

interface ReqQuery {
  Authority: string;
  Status: "OK" | "NOK";
}

const paymentVerifyController: RequestHandler<any, any, any, ReqQuery> =
  async function (req, res, next) {
    let success: boolean;

    const { Authority, Status } = req.query;
    const order = await Order.findOne({
      authority: Authority,
      paid: false,
    }).populate("user");

    if (!order) return res.redirect("/404");
    const session = await Session.findOne().byUserId(order.userId);
    if (!session) return res.redirect("/404");

    const response = await verifyPayment(
      (order as unknown as TOrder).price,
      Authority
    );
    if (Status === "OK" && response) {
      order.paid = true;
      order.authority = "";
      order.refId = response;
      order.save();
      success = true;

      if (session.paymentMessageId) {
        bot.telegram.deleteMessage(session.chatId, session.paymentMessageId);
        session.paymentMessageId = undefined;
        await session.save();
      }
    } else {
      success = false;
    }
    const messages = new OrderMessages(session);
    const message = messages.purchaseResult(success);
    bot.telegram.sendMessage(session?.chatId, message);

    res.render("payment-result", {
      order,
      response: response,
      status: Status,
    });
  };

export default paymentVerifyController;
