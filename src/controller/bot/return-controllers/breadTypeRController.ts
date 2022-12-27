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


const breadTypeRController: Controller = async function (ctx) {
  await setOrderSession(ctx, ctx.userId, "breadType", undefined);
  const  isTomorrow = ctx.isTomorrow;
  if (isTomorrow) {
    await setOrderSession(ctx, ctx.userId, "type", undefined);
    const messages = new OrderMessages(await Session.find().byCtx(ctx), isTomorrow);
    return getControllerResult(
      messages.orderBread,
      SessionStates.ENTERING_ORDER_TYPE,
      buttons.orderTypeButtons
    );
  }
  const messages = new OrderMessages(await Session.find().byCtx(ctx), isTomorrow);
  const session = await setOrderSession(ctx, ctx.userId, "days", []);
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
