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


const orderTypeRController: Controller = async function (ctx) {
  await setOrderSession(ctx, ctx.userId, "type", undefined);
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow)
  return getControllerResult(
    messages.botProcessMessage,
    SessionStates.UNDEFINED,
    buttons.mainButtons
  );
};

orderTypeRController.type = ControllerTypes.RETURN;
orderTypeRController.occasion = SessionStates.ENTERING_ORDER_TYPE;

export default orderTypeRController;
