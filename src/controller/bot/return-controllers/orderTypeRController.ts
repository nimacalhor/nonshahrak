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

const orderTypeRController: Controller = async function (ctx) {
  await setOrderSession(getUserId(ctx), "type", undefined);
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  return getControllerResult(
    messages.botProcessMessage,
    SessionStates.UNDEFINED,
    buttons.mainButtons
  );
};

orderTypeRController.type = ControllerTypes.RETURN;
orderTypeRController.occasion = SessionStates.ENTERING_ORDER_TYPE;

export default orderTypeRController;
