import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { getControllerResult, setOrderSession } from "@helper/bot";
import { Controller } from "@t/controller";
import OrderMessages from "@view/messages";
import buttons from "@view/reply-markups";

const bradAmountRController: Controller = async function (ctx) {
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow);
  await setOrderSession(ctx, ctx.userId, ["amount", "breadType"], undefined);
  return getControllerResult(
    messages.chooseBreadType(),
    SessionStates.ENTERING_BREAD_TYPE,
    buttons.breadTypeButtons
  );
};

bradAmountRController.type = ControllerTypes.RETURN;
bradAmountRController.occasion = SessionStates.ENTERING_BREAD_AMOUNT;

export default bradAmountRController;
