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

const weekdaysRController: Controller = async function (ctx) {
  await setOrderSession(getUserId(ctx), "type", undefined);
  await setOrderSession(getUserId(ctx), "days", []);
  const messages = new OrderMessages(
    await Session.find().byCtx(ctx),
    await isOrderTypeTomorrow(getUserId(ctx))
  );
  return getControllerResult(
    messages.orderBread,
    SessionStates.ENTERING_ORDER_TYPE,
    buttons.orderTypeButtons
  );
};

weekdaysRController.type = ControllerTypes.RETURN;
weekdaysRController.occasion = SessionStates.ENTERING_WEEK_DAYS;

export default weekdaysRController;
