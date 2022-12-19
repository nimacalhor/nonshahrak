import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller, ReplyMarkup } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
} from "@helper/bot";
import OrderMessages from "@view/messages";

const orderTypeRController: Controller = function (ctx) {
  setOrderSession(ctx, "type", undefined);
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  return getControllerResult(
    messages.botProcessMessage,
    SessionStates.UNDEFINED,
    buttons.mainButtons
  );
};

orderTypeRController.type = ControllerTypes.RETURN;
orderTypeRController.occasion = SessionStates.ENTERING_ORDER_TYPE;

export default orderTypeRController;
