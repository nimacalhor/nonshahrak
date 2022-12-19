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

const bradAmountRController: Controller = function (ctx) {
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  setOrderSession(ctx, ["amount", "breadType"], undefined);
  return getControllerResult(
    messages.chooseBreadType(),
    SessionStates.ENTERING_BREAD_TYPE,
    buttons.breadTypeButtons
  );
};

bradAmountRController.type = ControllerTypes.RETURN;
bradAmountRController.occasion = SessionStates.ENTERING_BREAD_AMOUNT;

export default bradAmountRController;
