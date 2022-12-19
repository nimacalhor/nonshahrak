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

const timeRController: Controller = function (ctx) {
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  setOrderSession(ctx, ["time", "amount"], undefined);
  return getControllerResult(
    messages.enterBreadAmount(),
    SessionStates.ENTERING_BREAD_AMOUNT,
    buttons.breadAmountButtons
  );
};

timeRController.type = ControllerTypes.RETURN;
timeRController.occasion = SessionStates.ENTERING_TIME;

export default timeRController;
