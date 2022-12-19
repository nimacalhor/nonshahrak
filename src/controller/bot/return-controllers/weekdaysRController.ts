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

const weekdaysRController: Controller = function (ctx) {
  setOrderSession(ctx, ["days", "type"], undefined);
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  return getControllerResult(
    messages.orderBread,
    SessionStates.ENTERING_ORDER_TYPE,
    buttons.orderTypeButtons
  );
};

weekdaysRController.type = ControllerTypes.RETURN;
weekdaysRController.occasion = SessionStates.ENTERING_WEEK_DAYS;

export default weekdaysRController;
