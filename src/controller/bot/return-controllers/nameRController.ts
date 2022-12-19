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

const nameRController: Controller = function (ctx) {
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  setOrderSession(ctx, ["name", "time"], undefined);
  return getControllerResult(
    messages.enterTime(),
    SessionStates.ENTERING_TIME,
    buttons.enterTimeButtons
  );
};

nameRController.type = ControllerTypes.RETURN;
nameRController.occasion = SessionStates.ENTERING_NAME;

export default nameRController;
