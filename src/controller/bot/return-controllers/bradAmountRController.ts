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

const bradAmountRController: Controller = async function (ctx) {
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  await setOrderSession(getUserId(ctx), ["amount", "breadType"], undefined);
  return getControllerResult(
    messages.chooseBreadType(),
    SessionStates.ENTERING_BREAD_TYPE,
    buttons.breadTypeButtons
  );
};

bradAmountRController.type = ControllerTypes.RETURN;
bradAmountRController.occasion = SessionStates.ENTERING_BREAD_AMOUNT;

export default bradAmountRController;
