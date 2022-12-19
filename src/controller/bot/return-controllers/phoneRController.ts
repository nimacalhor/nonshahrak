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

const phoneRController: Controller = function (ctx) {
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  setOrderSession(ctx, ["phone", "name"], undefined);
  return getControllerResult(
    messages.enterName(),
    SessionStates.ENTERING_NAME,
    buttons.enterNameButtons
  );
};

phoneRController.type = ControllerTypes.RETURN;
phoneRController.occasion = SessionStates.ENTERING_PHONE;

export default phoneRController;
