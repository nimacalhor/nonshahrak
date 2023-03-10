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


const entranceRController: Controller = async function (ctx) {
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow)
  await setOrderSession(ctx, ctx.userId, ["entrance", "block"], undefined);
  return getControllerResult(
    messages.getBlock(),
    SessionStates.ENTERING_BLOCK,
    buttons.enterBlock
  );
};

entranceRController.type = ControllerTypes.RETURN;
entranceRController.occasion = SessionStates.ENTERING_ENTRANCE;

export default entranceRController;
