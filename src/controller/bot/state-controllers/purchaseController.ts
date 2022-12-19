import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller, ReplyMarkup } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import Order from "@src/model/Order";

const purchaseController: Controller = async function (ctx) {
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  Order.deleteMany({ userId: getUserId(ctx), paid: false });
  return getControllerResult(
    messages.botProcessMessage,
    SessionStates.UNDEFINED,
    buttons.mainButtons
  );
};

purchaseController.type = ControllerTypes.STATE;
purchaseController.occasion = SessionStates.PURCHASING_ORDER;

export default purchaseController;
