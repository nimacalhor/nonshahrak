import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller, ReplyMarkup } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import { isNumber } from "@src/lib/helper";
import AlertMessages from "@src/view/messages/AlertMessages";

const blockController: Controller = function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_BLOCK,
      buttons.enterBlock
    );
  setOrderSession(ctx, "block", entry);
  return getControllerResult(
    messages.getEntrance(),
    SessionStates.ENTERING_ENTRANCE,
    buttons.enterEntrance
  );
};

blockController.type = ControllerTypes.STATE;
blockController.occasion = SessionStates.ENTERING_BLOCK;

export default blockController;
