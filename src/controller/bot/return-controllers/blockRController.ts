import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { getControllerResult, setOrderSession } from "@helper/bot";
import { Controller } from "@t/controller";
import OrderMessages from "@view/messages";
import buttons from "@view/reply-markups";

const blockRController: Controller = async function (ctx) {
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow);
  await setOrderSession(ctx, ctx.userId, ["block", "phone"], undefined);
  return getControllerResult(
    messages.enterPhone(),
    SessionStates.ENTERING_PHONE,
    buttons.enterPhoneButtons
  );
};

blockRController.type = ControllerTypes.RETURN;
blockRController.occasion = SessionStates.ENTERING_BLOCK;

export default blockRController;
