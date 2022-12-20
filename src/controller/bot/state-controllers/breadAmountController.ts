import { getControllerResult, getUserId } from "./../../../lib/helper/bot/index";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import { isOrderTypeTomorrow, setOrderSession } from "@helper/bot";
import OrderMessages from "@view/messages";
import { isNumber } from "@src/lib/helper";
import AlertMessages from "@src/view/messages/AlertMessages";
import Session from "@src/model/Session";

const breadAmountController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));

  if (!isNumber(entry))
    return getControllerResult(
      AlertMessages.enterNumber,
      SessionStates.ENTERING_BREAD_AMOUNT,
      buttons.breadAmountButtons
    );

  await setOrderSession(getUserId(ctx), "amount", entry);
  return getControllerResult(
    messages.enterTime(),
    SessionStates.ENTERING_TIME,
    buttons.enterTimeButtons
  );
};

breadAmountController.type = ControllerTypes.STATE;
breadAmountController.occasion = SessionStates.ENTERING_BREAD_AMOUNT;

export default breadAmountController;
