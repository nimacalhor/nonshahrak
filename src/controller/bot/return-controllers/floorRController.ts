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

const floorRController: Controller = async function (ctx) {
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  await setOrderSession(getUserId(ctx), ["floor", "entrance"], undefined);
  return getControllerResult(
    messages.getEntrance(),
    SessionStates.ENTERING_ENTRANCE,
    buttons.enterEntrance
  );
};

floorRController.type = ControllerTypes.RETURN;
floorRController.occasion = SessionStates.ENTERING_FLOOR_LEVEL;

export default floorRController;
