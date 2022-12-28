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
    const orders = await Order.find({
      authority: Authority,
      paid: false,
    });

    if (!orders.length) return res.redirect("/404");
    const order = orders[0];

    const [duplicatedOrders, session] = await Promise.all([
      Order.find().byUserId(order.userId).where("duplicated").equals(true),
      Session.find().byUserId(order.userId),
    ]);
    if (!session) return res.redirect("/404");

    // payment verify
    const response = await verifyPayment(
      (order as unknown as TOrder).price,
      Authority
    );

    // update orders
    if (Status === "OK" && response) {
      orders.forEach((order) => {
        order.paid = true;
        order.authority = "";
        order.refId = response;
        order.save();
      });
      duplicatedOrders.forEach((order) => order.remove());

      success = true;

      // update bot messages
      if (session.paymentMessageId) {
        bot.telegram.deleteMessage(session.chatId, session.paymentMessageId);
        session.paymentMessageId = undefined;
        await session.save();
      }
    } else {
      success = false;
      duplicatedOrders.forEach((order) => {
        order.duplicated = false;
        order.save();
      });
    }

    // send message
    const messages = new OrderMessages(session);
    const message = messages.purchaseResult(success);
    bot.telegram.sendMessage(session?.chatId, message);

    // render html
    res.render("payment-result", {
      order,
      response: response,
      status: Status,
    });
  };

export default paymentVerifyController;
