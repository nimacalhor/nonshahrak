import { getControllerResult } from "./../../../lib/helper/bot/index";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller, ReplyMarkup } from "@t/controller";
import buttons from "@view/reply-markups";
import { isOrderTypeTomorrow, setOrderSession } from "@helper/bot";
import OrderMessages from "@view/messages";
import { isNumber } from "@src/lib/helper";
import AlertMessages from "@src/view/messages/AlertMessages";

const breadAmountController: Controller = function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));

  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_BREAD_AMOUNT,
      buttons.breadAmountButtons
    );

  setOrderSession(ctx, "amount", entry);
  return getControllerResult(
    messages.enterTime(),
    SessionStates.ENTERING_TIME,
    buttons.enterTimeButtons
  );
};

breadAmountController.type = ControllerTypes.STATE;
breadAmountController.occasion = SessionStates.ENTERING_BREAD_AMOUNT;

export default breadAmountController;
