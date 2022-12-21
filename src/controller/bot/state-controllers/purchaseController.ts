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
import Session from "@src/model/Session";

const purchaseController: Controller = async function (ctx) {
  const session = await Session.find().byCtx(ctx);
  const messages = new OrderMessages(
    session,
    await isOrderTypeTomorrow(getUserId(ctx))
  );
  const order = await Order.find()
    .byUserId(getUserId(ctx))
    .where("paid")
    .equals(false)
    .findOne();
  order && order.remove();

  const messageId = session?.paymentMessageId;
  if (messageId) ctx.deleteMessage(messageId);
  return getControllerResult(
    messages.botProcessMessage,
    SessionStates.UNDEFINED,
    buttons.mainButtons
  );
};

purchaseController.type = ControllerTypes.STATE;
purchaseController.occasion = SessionStates.PURCHASING_ORDER;

export default purchaseController;
