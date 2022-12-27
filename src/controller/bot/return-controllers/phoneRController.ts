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


const phoneRController: Controller = async function (ctx) {
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow)
  await setOrderSession(ctx, ctx.userId, ["phone", "name"], undefined);
  return getControllerResult(
    messages.enterName(),
    SessionStates.ENTERING_NAME,
    buttons.enterNameButtons
  );
};

phoneRController.type = ControllerTypes.RETURN;
phoneRController.occasion = SessionStates.ENTERING_PHONE;

export default phoneRController;
