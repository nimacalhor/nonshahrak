import { paymentRequest } from "./../../../zarinpal";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  compareEnum,
  calcPrice,
  daysToIndex,
  getUserId,
  getUsername,
  deleteSession,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import AlertMessages from "@src/view/messages/AlertMessages";
import Order from "@src/model/Order";
import User from "@src/model/User";
import DailyOrder from "@src/model/DailyOrder";
import { User as TUser } from "@t/user";

const orderConfirmationController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const isTomorrow = isOrderTypeTomorrow(ctx);
  const messages = new OrderMessages(ctx, isTomorrow);

  if (compareEnum(entry, ButtonLabels.CANCEL_ORDER)) {
    (ctx.session as any) = undefined;
    return getControllerResult(
      messages.botProcessMessage,
      SessionStates.UNDEFINED,
      buttons.mainButtons
    );
  }

  let user: TUser | null;
  const userId = getUserId(ctx);
  const userInDb = await User.findOne().byUserId(userId);
  if (userInDb) user = userInDb;
  else {
    const { name, phone, block, entrance, floor, unit } = ctx.session.order;
    const username = getUsername(ctx);
    user = await User.create({
      name,
      phone,
      block,
      entrance,
      floor,
      unit,
      userId,
      username,
    });
  }

  // daily order
  if (!isTomorrow) {
    const { days, breadType, amount, time } = ctx.session.order;
    await DailyOrder.create({
      days: daysToIndex(days),
      breadType,
      amount,
      time,
      user: user._id,
      userId,
    });
    deleteSession(ctx);
    return getControllerResult(
      messages.orderSubmitted(),
      SessionStates.UNDEFINED,
      buttons.mainButtons
    );
  }

  // tomorrow order
  const { amount, breadType, time } = ctx.session.order;
  const response = await paymentRequest(
    calcPrice(parseInt(amount as any), breadType as string)
  );
  if (response) {
    ctx.reply("⏳ ...", { reply_markup: buttons.paymentButtons });
    await Order.create({
      breadType,
      amount,
      time,
      user: user._id,
      authority: response.authority,
      userId,
    });
    return getControllerResult(
      messages.orderSubmitted(),
      SessionStates.PURCHASING_ORDER,
      buttons.paymentLink(response.url)
    );
  }
  return getControllerResult(
    AlertMessages.paymentReqErr,
    SessionStates.ORDER_CONFIRMATION,
    buttons.confirmOrderButtons
  );
};

orderConfirmationController.type = ControllerTypes.STATE;
orderConfirmationController.occasion = SessionStates.ORDER_CONFIRMATION;

export default orderConfirmationController;
