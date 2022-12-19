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
import { isNumber } from "@src/lib/helper";
import AlertMessages from "@src/view/messages/AlertMessages";

const floorController: Controller = function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_FLOOR_LEVEL,
      buttons.enterFloorButtons
    );
  setOrderSession(ctx, "floor", entry);
  return getControllerResult(
    messages.getUnit(),
    SessionStates.ENTERING_UNIT,
    buttons.enterUnitButtons
  );
};

floorController.type = ControllerTypes.STATE;
floorController.occasion = SessionStates.ENTERING_FLOOR_LEVEL;

export default floorController;
