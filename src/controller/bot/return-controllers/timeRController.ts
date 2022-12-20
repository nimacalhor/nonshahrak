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
import Session from "@src/model/Session";

const timeRController: Controller = async function (ctx) {
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  await setOrderSession(getUserId(ctx), ["time", "amount"], undefined);
  return getControllerResult(
    messages.enterBreadAmount(),
    SessionStates.ENTERING_BREAD_AMOUNT,
    buttons.breadAmountButtons
  );
};

timeRController.type = ControllerTypes.RETURN;
timeRController.occasion = SessionStates.ENTERING_TIME;

export default timeRController;
