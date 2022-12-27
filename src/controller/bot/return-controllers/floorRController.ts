import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { getControllerResult, setOrderSession } from "@helper/bot";
import { Controller } from "@t/controller";
import OrderMessages from "@view/messages";
import buttons from "@view/reply-markups";

const floorRController: Controller = async function (ctx) {
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow);
  await setOrderSession(ctx, ctx.userId, ["floor", "entrance"], undefined);
  return getControllerResult(
    messages.getEntrance(),
    SessionStates.ENTERING_ENTRANCE,
    buttons.enterEntrance
  );
};

floorRController.type = ControllerTypes.RETURN;
floorRController.occasion = SessionStates.ENTERING_FLOOR_LEVEL;

export default floorRController;
