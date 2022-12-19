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

const unitRController: Controller = function (ctx) {
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  setOrderSession(ctx, ["unit", "floor"], undefined);
  return getControllerResult(
    messages.getFloorLevel(),
    SessionStates.ENTERING_FLOOR_LEVEL,
    buttons.enterFloorButtons
  );
};

unitRController.type = ControllerTypes.RETURN;
unitRController.occasion = SessionStates.ENTERING_UNIT;

export default unitRController;
