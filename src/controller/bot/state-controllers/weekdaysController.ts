import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  compareEnum,
  getControllerResult,
  getUserId,
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
import { SessionDoc } from "@src/types/session";
import Session from "@src/model/Session";

const weekdaysController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const weekdays = PERSIAN_WEEKDAYS.filter((d) => d !== "_");
  const deleteWeekdays = DELETE_PERSIAN_WEEKDAYS;
  let session: SessionDoc = (await Session.findOne().byUserId(
    getUserId(ctx)
  )) as SessionDoc;

  if (compareEnum(entry, ...weekdays)) {
    session = await setOrderSession(getUserId(ctx), "days", [
      ...new Set([...(session.order.days || []), entry]),
    ]);
    const messages = new OrderMessages(
      await Session.find().byCtx(ctx),
      await isOrderTypeTomorrow(getUserId(ctx))
    );
    return getControllerResult(
      messages.daySelected(),
      SessionStates.ENTERING_WEEK_DAYS,
      buttons.chooseWeekdaysButtons(session.order.days)
    );
  }

  if (compareEnum(entry, ...deleteWeekdays)) {
    session = await setOrderSession(
      getUserId(ctx),
      "days",
      [...(session.order.days || [])].filter(
        (d) => d !== entry.replace("حذف ", "")
      )
    );
    const messages = new OrderMessages(
      await Session.find().byCtx(ctx),
      await isOrderTypeTomorrow(getUserId(ctx))
    );
    return getControllerResult(
      messages.dayDeleted(),
      SessionStates.ENTERING_WEEK_DAYS,
      buttons.chooseWeekdaysButtons(session.order.days)
    );
  }
  if (compareEnum(entry, ButtonLabels.CONFIRM)) {
    if (session.order.days.length === 0)
      return getControllerResult(
        AlertMessages.noDaySelected,
        SessionStates.ENTERING_WEEK_DAYS,
        buttons.chooseWeekdaysButtons([])
      );
    const messages = new OrderMessages(
      await Session.find().byCtx(ctx),
      await isOrderTypeTomorrow(getUserId(ctx))
    );
    return getControllerResult(
      messages.chooseBreadType(),
      SessionStates.ENTERING_BREAD_TYPE,
      buttons.breadTypeButtons
    );
  }

  return getControllerResult(
    AlertMessages.chooseFromButtons,
    SessionStates.ENTERING_WEEK_DAYS,
    buttons.chooseWeekdaysButtons(session.order.days)
  );
};

weekdaysController.type = ControllerTypes.STATE;
weekdaysController.occasion = SessionStates.ENTERING_WEEK_DAYS;

export default weekdaysController;
