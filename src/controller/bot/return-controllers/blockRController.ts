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

const blockRController: Controller = function (ctx) {
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  setOrderSession(ctx, ["block", "phone"], undefined);
  return getControllerResult(
    messages.enterPhone(),
    SessionStates.ENTERING_PHONE,
    buttons.enterPhoneButtons
  );
};

blockRController.type = ControllerTypes.RETURN;
blockRController.occasion = SessionStates.ENTERING_BLOCK;

export default blockRController;
