import { ControllerResult } from "./../../../types/controller";
import AlertMessages from "@src/view/messages/AlertMessages";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import Session from "@src/model/Session";
import Keywords from "@src/lib/constants/bot/keywords";
import Order from "@src/model/Order";

const myOrdersController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const session = await Session.find().byCtx(ctx);
  const userId = getUserId(ctx);
  const messages = new OrderMessages(
    session,
    await isOrderTypeTomorrow(userId)
  );
  ctx.reply("⏳ ...", { reply_markup: buttons.myOrdersButtons });

  const orders = await Order.find().byUserId(userId).where("paid").equals(true);

  if (orders.length === 0)
    return getControllerResult(
      AlertMessages.noSubmittedOrder,
      SessionStates.UNDEFINED,
      buttons.myOrdersButtons
    );
  orders
    .slice(0, orders.length - 1)
    .forEach((order) => ctx.reply(messages.getOrderString(order)));
  return getControllerResult(
    messages.getOrderString(orders.slice(orders.length - 1)[0]),
    SessionStates.WATCHING_ORDERS,
    buttons.myOrdersButtons
  );
};

myOrdersController.type = ControllerTypes.KEYWORD;
myOrdersController.occasion = Keywords.MY_ORDER;

export default myOrdersController;
