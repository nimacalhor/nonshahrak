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
} from "@helper/bot";
import OrderMessages from "@view/messages";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import AlertMessages from "@src/view/messages/AlertMessages";
import Order from "@src/model/Order";
import User from "@src/model/User";
import DailyOrder from "@src/model/DailyOrder";
import { User as TUser, UserDoc } from "@t/user";
import { getTomorrowsDate } from "@src/lib/helper/date-helper";

const orderConfirmationController: Controller = async function (ctx) {
  const entry = ctx.entry;
  const isTomorrow = ctx.isTomorrow;
  const messages = new OrderMessages(ctx.session, isTomorrow);
  const session = ctx.session;

  if (compareEnum(entry, ButtonLabels.CANCEL_ORDER)) {
    session && (await session.remove());
    return getControllerResult(
      messages.botProcessMessage,
      SessionStates.UNDEFINED,
      buttons.mainButtons
    );
  }

  let user: TUser | null = null;
  const userId = ctx.userId;
  const userInDb = await User.find().byUserId(userId);
  // TODO error handling
  if (!session || !session.order)
    return getControllerResult(
      messages.botProcessMessage,
      SessionStates.UNDEFINED,
      buttons.mainButtons
    );

  // setting user
  if (userInDb) {
    if (session.enteringProfile) userInDb.remove();
    else user = userInDb;
  } else {
    const { name, phone, block, entrance, floor, unit } = session.order;
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
    const { days, breadType, amount, time } = session.order;
    const dailyOrderToReplace = await DailyOrder.find().byUserId(userId);
    let dailyOrderToReplaceSavePromise: Promise<any> = Promise.resolve();
    if (dailyOrderToReplace) {
      dailyOrderToReplace.duplicated = true;
      dailyOrderToReplaceSavePromise = dailyOrderToReplace.save();
    }
    await Promise.all([
      dailyOrderToReplaceSavePromise,
      DailyOrder.create({
        days: daysToIndex(days),
        breadType,
        amount,
        time,
        user: (user as UserDoc)._id,
        userId,
      }),
      session.remove(),
    ]);
    return getControllerResult(
      messages.orderSubmitted(),
      SessionStates.UNDEFINED,
      buttons.mainButtons
    );
  }

  // tomorrow order
  const { amount, breadType, time } = session.order;
  ctx.reply("⏳ ...", { reply_markup: buttons.paymentButtons });
  const response = await paymentRequest(
    calcPrice(parseInt(amount as any), breadType as string)
  );
  if (response) {
    const tmrDate = getTomorrowsDate();
    const ordersToReplace = await Order.find({
      userId,
      day: tmrDate.getDate(),
      month: tmrDate.getMonth(),
    });
    await Promise.all([
      ...ordersToReplace.map((doc) => {
        doc.duplicated = true;
        return doc.save();
      }),
      Order.create({
        breadType,
        amount,
        time,
        user: (user as UserDoc)._id,
        authority: response.authority,
        userId,
      }),
    ]);

    return getControllerResult(
      messages.orderSubmitted(),
      SessionStates.PURCHASING_ORDER,
      buttons.paymentLink(response.url),
      true
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
