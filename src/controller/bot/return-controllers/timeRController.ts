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


const timeRController: Controller = async function (ctx) {
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow)
  await setOrderSession(ctx, ctx.userId, ["time", "amount"], undefined);
  return getControllerResult(
    messages.enterBreadAmount(),
    SessionStates.ENTERING_BREAD_AMOUNT,
    buttons.breadAmountButtons
  );
};

timeRController.type = ControllerTypes.RETURN;
timeRController.occasion = SessionStates.ENTERING_TIME;

export default timeRController;
