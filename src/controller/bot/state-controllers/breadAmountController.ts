import {
  getControllerResult,
  getUserId,
} from "./../../../lib/helper/bot/index";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import { setOrderSession } from "@helper/bot";
import OrderMessages from "@view/messages";
import { isNumber } from "@src/lib/helper";
import AlertMessages from "@src/view/messages/AlertMessages";

const breadAmountController: Controller = async function (ctx) {
  const entry = ctx.entry;
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow);

  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_BREAD_AMOUNT,
      buttons.breadAmountButtons
    );

  await setOrderSession(ctx, ctx.userId, "amount", entry);
  return getControllerResult(
    messages.enterTime(),
    SessionStates.ENTERING_TIME,
    buttons.enterTimeButtons
  );
};

breadAmountController.type = ControllerTypes.STATE;
breadAmountController.occasion = SessionStates.ENTERING_BREAD_AMOUNT;

export default breadAmountController;
