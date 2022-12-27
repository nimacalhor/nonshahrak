import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import { getControllerResult, setOrderSession, getUserId } from "@helper/bot";
import OrderMessages from "@view/messages";
import { isNumber } from "@src/lib/helper";
import AlertMessages from "@src/view/messages/AlertMessages";

const blockController: Controller = async function (ctx) {
  const entry = ctx.entry;
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow);
  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_BLOCK,
      buttons.enterBlock
    );
  await setOrderSession(ctx, ctx.userId, "block", entry);
  return getControllerResult(
    messages.getEntrance(),
    SessionStates.ENTERING_ENTRANCE,
    buttons.enterEntrance
  );
};

blockController.type = ControllerTypes.STATE;
blockController.occasion = SessionStates.ENTERING_BLOCK;

export default blockController;
