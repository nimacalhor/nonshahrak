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


const weekdaysRController: Controller = async function (ctx) {
  await setOrderSession(ctx, ctx.userId, "type", undefined);
  await setOrderSession(ctx, ctx.userId, "days", []);
const messages = new OrderMessages(ctx.session, ctx.isTomorrow)
  return getControllerResult(
    messages.orderBread,
    SessionStates.ENTERING_ORDER_TYPE,
    buttons.orderTypeButtons
  );
};

weekdaysRController.type = ControllerTypes.RETURN;
weekdaysRController.occasion = SessionStates.ENTERING_WEEK_DAYS;

export default weekdaysRController;
