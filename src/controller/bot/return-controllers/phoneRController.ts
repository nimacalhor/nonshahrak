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

const phoneRController: Controller = async function (ctx) {
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  await setOrderSession(getUserId(ctx), ["phone", "name"], undefined);
  return getControllerResult(
    messages.enterName(),
    SessionStates.ENTERING_NAME,
    buttons.enterNameButtons
  );
};

phoneRController.type = ControllerTypes.RETURN;
phoneRController.occasion = SessionStates.ENTERING_PHONE;

export default phoneRController;
