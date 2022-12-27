import ButtonLabels from "@src/lib/constants/bot/button-labels";
import { SessionStates } from "@src/lib/constants/bot/session";
import ControllerTypes from "@src/lib/constants/controllerTypes";
import {
  compareEnum,
  getControllerResult,
  setOrderSession,
} from "@src/lib/helper/bot";
import { getTomorrowsDate } from "@src/lib/helper/date-helper";
import DailyOrder from "@src/model/DailyOrder";
import Order from "@src/model/Order";
import { Controller } from "@src/types/controller";
import OrderMessages from "@src/view/messages";
import AlertMessages from "@src/view/messages/AlertMessages";
import buttons from "@view/reply-markups";

const orderTypeController: Controller = async function (ctx) {
  const entry = ctx.entry;

  // check buttons
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

  ctx.reply("⌛ ...");

  await setOrderSession(ctx, ctx.userId, "type", entry);

  let itemExists: boolean = false;
  let isTomorrow: boolean = ctx.isTomorrow;
  const userId = ctx.userId;

  // if tomorrow
  if (isTomorrow) {
    const orderForTomorrow = await Order.exists({
      userId,
      day: getTomorrowsDate().getDate(),
      month: getTomorrowsDate().getMonth(),
    });
    if (orderForTomorrow) itemExists = true;
  }
  // if daily
  else {
    const dailyOrder = await DailyOrder.exists({ userId });
    if (dailyOrder) itemExists = true;
  }

  if (itemExists) ctx.reply(AlertMessages.orderExists(isTomorrow));

  const session = ctx.session;
  const messages = new OrderMessages(session, isTomorrow);
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
