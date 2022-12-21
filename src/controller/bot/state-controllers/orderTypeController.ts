import {
  getControllerResult,
  getUserId,
  isOrderTypeTomorrow,
  setOrderSession,
} from "@src/lib/helper/bot";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import { SessionStates } from "@src/lib/constants/bot/session";
import ControllerTypes from "@src/lib/constants/controllerTypes";
import { compareEnum } from "@src/lib/helper/bot";
import { Controller } from "@src/types/controller";
import OrderMessages from "@src/view/messages";
import AlertMessages from "@src/view/messages/AlertMessages";
import buttons from "@view/reply-markups";
import Session from "@src/model/Session";

const orderTypeController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;

  if (
    !compareEnum(
      entry,
      ButtonLabels.ORDER_TYPE_DAILY,
      ButtonLabels.ORDER_TYPE_TOMORROW
    )
  )
    return getControllerResult(
      AlertMessages.chooseFromButtons,
      SessionStates.ENTERING_ORDER_TYPE,
      buttons.orderTypeButtons
    );

  await setOrderSession(getUserId(ctx), "type", entry);
  const isTomorrow = await isOrderTypeTomorrow(getUserId(ctx));
  const messages = new OrderMessages(
    await Session.find().byCtx(ctx),
    isTomorrow
  );
  const session = await Session.find().byUserId(getUserId(ctx));
  const days: string[] = session ? session.order.days : [];

  const message = isTomorrow
    ? messages.chooseBreadType()
    : messages.chooseWeekdays();
  const replyMarkup = isTomorrow
    ? buttons.breadTypeButtons
    : buttons.chooseWeekdaysButtons(days);
  const state = isTomorrow
    ? SessionStates.ENTERING_BREAD_TYPE
    : SessionStates.ENTERING_WEEK_DAYS;

  return getControllerResult(message, state, replyMarkup);
};

orderTypeController.type = ControllerTypes.STATE;
orderTypeController.occasion = SessionStates.ENTERING_ORDER_TYPE;

export default orderTypeController;
