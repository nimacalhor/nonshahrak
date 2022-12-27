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


const profileConfirmationRController: Controller = async function (ctx) {
  await setOrderSession(ctx, ctx.userId, "time", undefined);
const messages = new OrderMessages(ctx.session, ctx.isTomorrow)
  return getControllerResult(
    messages.enterTime(),
    SessionStates.ENTERING_TIME,
    buttons.enterTimeButtons
  );
};

profileConfirmationRController.type = ControllerTypes.RETURN;
profileConfirmationRController.occasion = SessionStates.PROFILE_CONFIRMATION;

export default profileConfirmationRController;
