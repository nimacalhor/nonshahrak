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

const blockRController: Controller = async function (ctx) {
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  await setOrderSession(getUserId(ctx), ["block", "phone"], undefined);
  return getControllerResult(
    messages.enterPhone(),
    SessionStates.ENTERING_PHONE,
    buttons.enterPhoneButtons
  );
};

blockRController.type = ControllerTypes.RETURN;
blockRController.occasion = SessionStates.ENTERING_BLOCK;

export default blockRController;
