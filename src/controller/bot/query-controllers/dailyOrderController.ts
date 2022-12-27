import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import {
  calcPrice,
  getControllerResult,
  isOrderTypeTomorrow,
} from "@helper/bot";
import { Controller } from "@t/controller";
import OrderMessages from "@view/messages";
import buttons from "@view/reply-markups";

import Queries from "@src/lib/constants/bot/queries";
import { getNextWeekDates } from "@src/lib/helper/date-helper";
import DailyOrder from "@src/model/DailyOrder";
import Order from "@src/model/Order";
import { DailyOrderDoc } from "@src/types/dailyOrder";
import { UserDoc } from "@src/types/user";
import AlertMessages from "@src/view/messages/AlertMessages";
import { paymentRequest } from "@src/zarinpal";

const dailyOrdersController: Controller = async function (ctx) {
  const entry = (ctx.callbackQuery as any).data as string;
  const session = ctx.session;
  if (session && session.thereIsPaymentMessage) {
    ctx.reply("☹");
    return undefined;
  }

  const userId = ctx.userId;
  const messages = new OrderMessages(
    session,
    await isOrderTypeTomorrow(userId)
  );

  const [_, day, timestamp] = entry.split("_");
  ctx.reply("⏳ ...", { reply_markup: buttons.paymentButtons });

  // daily order in db
  const dailyOrder = (await DailyOrder.find()
    .byUserId(userId)
    .populate("user")) as DailyOrderDoc;
  const { amount, breadType, time } = dailyOrder;

  // payment response
  const response = await paymentRequest(
    calcPrice(parseInt(amount as any), breadType as string)
  );
  if (!response)
    return getControllerResult(
      AlertMessages.paymentReqErr,
      SessionStates.ORDER_CONFIRMATION,
      buttons.confirmOrderButtons
    );

  // purchase next week ______________________________
  //
  if (day === "purchaseNextWeek" || !timestamp) {
    //
    const nextWeekDates = getNextWeekDates(dailyOrder.days);
    // paid orders in next week
    const paidOrdersInNextWeek = await Order.find({
      userId,
      paid: true,
      // $or: [{ day: 3 }, { day: 4 }, { month: 3 }, { month: 3 }}
      $or: nextWeekDates.map((dt) => ({
        day: dt.getDate(),
        month: dt.getMonth(),
      })),
    }).select(["day", "month"]);

    // all next week orders were purchased
    if (nextWeekDates.length === paidOrdersInNextWeek.length)
      return getControllerResult(
        AlertMessages.orderHasBeenPurchased(true),
        SessionStates.UNDEFINED,
        buttons.mainButtons
      );

    // find dates in which there is no paid orders
    const notPaidDates = nextWeekDates.filter(
      (date) =>
        !paidOrdersInNextWeek.some(
          (doc) => doc.day === date.getDate() && doc.month === date.getMonth()
        )
    );

    await Order.insertMany(
      notPaidDates.map((dt) => ({
        breadType,
        amount,
        time,
        user: (dailyOrder.user as unknown as UserDoc)._id,
        authority: response.authority,
        userId,
        date: dt,
      }))
    );

    if (session) {
      session.thereIsPaymentMessage = true;
      await session.save();
    }
    return getControllerResult(
      messages.orderSubmitted(true),
      SessionStates.PURCHASING_ORDER,
      buttons.paymentLink(response.url),
      true
    );
  }

  // purchase day ______________________________
  //
  // orders in selected date
  const selectedDate = new Date(parseInt(timestamp));
  const orderInDb = await Order.exists({
    userId,
    paid: true,
    day: selectedDate.getDate(),
    month: selectedDate.getMonth(),
  });

  if (orderInDb)
    return getControllerResult(
      AlertMessages.orderHasBeenPurchased(),
      SessionStates.UNDEFINED,
      buttons.mainButtons
    );

  await Order.create({
    breadType,
    amount,
    time,
    user: (dailyOrder.user as unknown as UserDoc)._id,
    authority: response.authority,
    userId,
    date: new Date(parseInt(timestamp)).setHours(0, 0, 0, 0),
  });

  if (session) {
    session.thereIsPaymentMessage = true;
    await session.save();
  }

  return getControllerResult(
    messages.orderSubmitted(true),
    SessionStates.PURCHASING_ORDER,
    buttons.paymentLink(response.url),
    true
  );
};

dailyOrdersController.type = ControllerTypes.QUERY;
dailyOrdersController.occasion = Queries.DAILY_ORDER;

export default dailyOrdersController;
