import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller, ReplyMarkup } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  compareEnum,
  getControllerResult,
  isOrderTypeTomorrow,
  setOrderSession,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import {
  DELETE_PERSIAN_WEEKDAYS,
  PERSIAN_WEEKDAYS,
} from "@src/lib/constants/date-constants";
import AlertMessages from "@src/view/messages/AlertMessages";

const weekdaysController: Controller = function (ctx) {
  const entry = ctx.message?.text as string;
  const weekdays = PERSIAN_WEEKDAYS.filter((d) => d !== "_");
  const deleteWeekdays = DELETE_PERSIAN_WEEKDAYS;

  if (compareEnum(entry, ...weekdays)) {
    setOrderSession(ctx, "days", [
      ...new Set([...(ctx.session.order.days || []), entry]),
    ]);
    const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
    return getControllerResult(
      messages.daySelected(),
      SessionStates.ENTERING_WEEK_DAYS,
      buttons.chooseWeekdaysButtons(ctx)
    );
  }

  if (compareEnum(entry, ...deleteWeekdays)) {
    setOrderSession(
      ctx,
      "days",
      [...(ctx.session.order.days || [])].filter(
        (d) => d !== entry.replace("حذف ", "")
      )
    );
    const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
    return getControllerResult(
      messages.dayDeleted(),
      SessionStates.ENTERING_WEEK_DAYS,
      buttons.chooseWeekdaysButtons(ctx)
    );
  }
  if (compareEnum(entry, ButtonLabels.CONFIRM)) {
    const messages = new OrderMessages(ctx, isOrderTypeTomorrow(ctx));
    return getControllerResult(
      messages.chooseBreadType(),
      SessionStates.ENTERING_BREAD_TYPE,
      buttons.breadTypeButtons
    );
  }

  return getControllerResult(
    AlertMessages.chooseFromButtons,
    SessionStates.ENTERING_WEEK_DAYS,
    buttons.chooseWeekdaysButtons(ctx)
  );
};

weekdaysController.type = ControllerTypes.STATE;
weekdaysController.occasion = SessionStates.ENTERING_WEEK_DAYS;

export default weekdaysController;
