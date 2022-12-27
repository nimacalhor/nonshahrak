import AlertMessages from "@src/view/messages/AlertMessages";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  getControllerResult,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import Keywords from "@src/lib/constants/bot/keywords";
import Order from "@src/model/Order";

const myOrdersController: Controller = async function (ctx) {
  const userId = ctx.userId;
  const messages = new OrderMessages(null);
  ctx.reply("⏳ ...");

  const orders = await Order.find().byUserId(userId).where("paid").equals(true);

  if (orders.length === 0)
    return getControllerResult(
      AlertMessages.noSubmittedOrder,
      SessionStates.UNDEFINED,
      buttons.mainButtons
    );
  orders
    .slice(0, orders.length - 1)
    .forEach((order) => ctx.reply(messages.getOrderString(order)));

  return getControllerResult(
    messages.getOrderString(orders.slice(orders.length - 1)[0]),
    SessionStates.UNDEFINED,
    buttons.mainButtons
  );
};

myOrdersController.type = ControllerTypes.KEYWORD;
myOrdersController.occasion = Keywords.MY_ORDER;

export default myOrdersController;
