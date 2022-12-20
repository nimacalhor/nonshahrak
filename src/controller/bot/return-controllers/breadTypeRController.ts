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
import Session from "@src/model/Session";

const breadTypeRController: Controller = async function (ctx) {
  await setOrderSession(getUserId(ctx), "breadType", undefined);
  const isTomorrow = await isOrderTypeTomorrow(getUserId(ctx));
  if (isTomorrow) {
    await setOrderSession(getUserId(ctx), "type", undefined);
    const messages = new OrderMessages(await Session.find().byCtx(ctx), isTomorrow);
    return getControllerResult(
      messages.orderBread,
      SessionStates.ENTERING_ORDER_TYPE,
      buttons.orderTypeButtons
    );
  }
  const messages = new OrderMessages(await Session.find().byCtx(ctx), isTomorrow);
  const session = await setOrderSession(getUserId(ctx), "days", []);
  const days = session ? session.order.days : [];
  return getControllerResult(
    messages.chooseWeekdays(),
    SessionStates.ENTERING_WEEK_DAYS,
    buttons.chooseWeekdaysButtons(days)
  );
};

breadTypeRController.type = ControllerTypes.RETURN;
breadTypeRController.occasion = SessionStates.ENTERING_BREAD_TYPE;

export default breadTypeRController;
