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

const breadTypeRController: Controller = function (ctx) {
  setOrderSession(ctx, "breadType", undefined);
  const isTomorrow = isOrderTypeTomorrow(ctx);
  if (isTomorrow) {
    setOrderSession(ctx, "type", undefined);
    const messages = new OrderMessages(ctx, isTomorrow);
    return getControllerResult(
      messages.orderBread,
      SessionStates.ENTERING_ORDER_TYPE,
      buttons.orderTypeButtons
    );
  }
  const messages = new OrderMessages(ctx, isTomorrow);
  setOrderSession(ctx, "days", undefined);
  return getControllerResult(
    messages.chooseWeekdays(),
    SessionStates.ENTERING_WEEK_DAYS,
    buttons.chooseWeekdaysButtons(ctx)
  );
};

breadTypeRController.type = ControllerTypes.RETURN;
breadTypeRController.occasion = SessionStates.ENTERING_BREAD_TYPE;

export default breadTypeRController;
