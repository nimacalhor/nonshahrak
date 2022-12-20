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
  const messages = new OrderMessages(
    await Session.find().byCtx(ctx),
    await isOrderTypeTomorrow(getUserId(ctx))
  );
  const order = await Order.findOne()
    .byUserId(getUserId(ctx))
    .where("paid")
    .equals(false);
  order && order.remove();

  return getControllerResult(
    messages.botProcessMessage,
    SessionStates.UNDEFINED,
    buttons.mainButtons
  );
};

purchaseController.type = ControllerTypes.STATE;
purchaseController.occasion = SessionStates.PURCHASING_ORDER;

export default purchaseController;
