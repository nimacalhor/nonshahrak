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

const floorRController: Controller = function (ctx) {
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  setOrderSession(ctx, ["floor", "entrance"], undefined);
  return getControllerResult(
    messages.getEntrance(),
    SessionStates.ENTERING_ENTRANCE,
    buttons.enterEntrance
  );
};

floorRController.type = ControllerTypes.RETURN;
floorRController.occasion = SessionStates.ENTERING_FLOOR_LEVEL;

export default floorRController;
