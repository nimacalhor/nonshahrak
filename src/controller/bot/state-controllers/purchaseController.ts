import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import Order from "@src/model/Order";

const purchaseController: Controller = async function (ctx) {
  const session = ctx.session;
  const messages = new OrderMessages(
    session,
    ctx.isTomorrow
  );
  const order = await Order.find()
    .byUserId(ctx.userId)
    .where("paid")
    .equals(false)
    .findOne();
  order && order.remove();

  const messageId = session?.paymentMessageId;
  if (messageId) ctx.deleteMessage(messageId);
  session.thereIsPaymentMessage = false;
  session.save();
  return getControllerResult(
    messages.botProcessMessage,
    SessionStates.UNDEFINED,
    buttons.mainButtons
  );
};

purchaseController.type = ControllerTypes.STATE;
purchaseController.occasion = SessionStates.PURCHASING_ORDER;

export default purchaseController;
