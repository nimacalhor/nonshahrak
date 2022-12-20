import { getUsername } from "./../../../lib/helper/bot/index";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
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
import Session from "@src/model/Session";

const unitController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_UNIT,
      buttons.enterUnitButtons
    );
  await setOrderSession(getUserId(ctx), "unit", entry);
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));

  return getControllerResult(
    messages.getOrderConfirmation(),
    SessionStates.ORDER_CONFIRMATION,
    buttons.confirmOrderButtons
  );
};

unitController.type = ControllerTypes.STATE;
unitController.occasion = SessionStates.ENTERING_UNIT;

export default unitController;
