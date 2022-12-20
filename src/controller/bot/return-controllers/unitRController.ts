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

const unitRController: Controller = async function (ctx) {
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  await setOrderSession(getUserId(ctx), ["unit", "floor"], undefined);
  return getControllerResult(
    messages.getFloorLevel(),
    SessionStates.ENTERING_FLOOR_LEVEL,
    buttons.enterFloorButtons
  );
};

unitRController.type = ControllerTypes.RETURN;
unitRController.occasion = SessionStates.ENTERING_UNIT;

export default unitRController;
