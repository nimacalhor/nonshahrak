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
import { isNumber } from "@src/lib/helper";
import AlertMessages from "@src/view/messages/AlertMessages";
import Session from "@src/model/Session";

const blockController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_BLOCK,
      buttons.enterBlock
    );
  await setOrderSession(getUserId(ctx), "block", entry);
  return getControllerResult(
    messages.getEntrance(),
    SessionStates.ENTERING_ENTRANCE,
    buttons.enterEntrance
  );
};

blockController.type = ControllerTypes.STATE;
blockController.occasion = SessionStates.ENTERING_BLOCK;

export default blockController;
