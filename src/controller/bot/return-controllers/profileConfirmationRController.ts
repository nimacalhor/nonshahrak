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
import Session from "@src/model/Session";

const profileConfirmationRController: Controller = async function (ctx) {
  await setOrderSession(getUserId(ctx), "time", undefined);
  const messages = new OrderMessages(
    await Session.find().byCtx(ctx),
    await isOrderTypeTomorrow(getUserId(ctx))
  );
  return getControllerResult(
    messages.enterTime(),
    SessionStates.ENTERING_TIME,
    buttons.enterTimeButtons
  );
};

profileConfirmationRController.type = ControllerTypes.RETURN;
profileConfirmationRController.occasion = SessionStates.PROFILE_CONFIRMATION;

export default profileConfirmationRController;
