import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
  getUserId,
  calcPrice,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import Session from "@src/model/Session";
import Queries from "@src/lib/constants/bot/queries";
import DailyOrder from "@src/model/DailyOrder";
import { DailyOrderDoc } from "@src/types/dailyOrder";
import { paymentRequest } from "@src/zarinpal";
import Order from "@src/model/Order";
import { UserDoc } from "@src/types/user";
import AlertMessages from "@src/view/messages/AlertMessages";

const dailyOrdersController: Controller = async function (ctx) {
  const entry = (ctx.callbackQuery as any).data as string;
  const session = await Session.findOne().byCtx(ctx);
  const userId = getUserId(ctx);
  const messages = new OrderMessages(
    session,
    await isOrderTypeTomorrow(userId)
  );
  const [_, day, timestamp] = entry.split("_");
  ctx.reply("⏳ ...", { reply_markup: buttons.paymentButtons });
  const dailyOrder = (await DailyOrder.find()
    .byUserId(userId)
    .populate("user")) as DailyOrderDoc;
  const { amount, breadType, time } = dailyOrder;
  const response = await paymentRequest(
    calcPrice(parseInt(amount as any), breadType as string)
  );

  if (response) {
    await Order.create({
      breadType,
      amount,
      time,
      user: (dailyOrder.user as unknown as UserDoc)._id,
      authority: response.authority,
      userId,
      date: new Date(timestamp)
    });
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

dailyOrdersController.type = ControllerTypes.QUERY;
dailyOrdersController.occasion = Queries.DAILY_ORDER;

export default dailyOrdersController;
