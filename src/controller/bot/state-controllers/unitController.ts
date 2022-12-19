import { getUsername } from "./../../../lib/helper/bot/index";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller, ReplyMarkup } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import { isNumber } from "@src/lib/helper";
import AlertMessages from "@src/view/messages/AlertMessages";
import User from "@src/model/User";

const unitController: Controller = function (ctx) {
  const entry = ctx.message?.text as string;
  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_UNIT,
      buttons.enterUnitButtons
    );
  setOrderSession(ctx, "unit", entry);
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));

  return getControllerResult(
    messages.getOrderConfirmation(),
    SessionStates.ORDER_CONFIRMATION,
    buttons.confirmOrderButtons
  );
};

unitController.type = ControllerTypes.STATE;
unitController.occasion = SessionStates.ENTERING_UNIT;

export default unitController;
