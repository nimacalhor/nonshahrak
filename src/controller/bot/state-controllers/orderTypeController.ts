import { isOrderTypeTomorrow, setOrderSession } from "@src/lib/helper/bot";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import { SessionStates } from "@src/lib/constants/bot/session";
import ControllerTypes from "@src/lib/constants/controllerTypes";
import { compareEnum } from "@src/lib/helper/bot";
import { Controller, ReplyMarkup } from "@src/types/controller";
import OrderMessages from "@src/view/messages";
import AlertMessages from "@src/view/messages/AlertMessages";
import buttons from "@view/reply-markups";

const orderTypeController: Controller = function (ctx) {
  let message: string = "";
  let state: SessionStates = SessionStates.UNDEFINED;
  let replyMarkup: ReplyMarkup = buttons.mainButtons;

  const result = () => ({ message, state, replyMarkup });
  const entry = ctx.message?.text as string;

  if (
    !compareEnum(
      entry,
      ButtonLabels.ORDER_TYPE_DAILY,
      ButtonLabels.ORDER_TYPE_TOMORROW
    )
  ) {
    message = AlertMessages.chooseFromButtons;
    replyMarkup = buttons.orderTypeButtons;
    state = SessionStates.ENTERING_ORDER_TYPE;
    return result();
  }
  setOrderSession(ctx, "type", entry);
  const isTomorrow = isOrderTypeTomorrow(ctx);
  const messages = new OrderMessages(ctx, isTomorrow);

  message = isTomorrow ? messages.chooseBreadType() : messages.chooseWeekdays();
  replyMarkup = isTomorrow
    ? buttons.breadTypeButtons
    : buttons.chooseWeekdaysButtons(ctx);
  state = isTomorrow
    ? SessionStates.ENTERING_BREAD_TYPE
    : SessionStates.ENTERING_WEEK_DAYS;

  return result();
};

orderTypeController.type = ControllerTypes.STATE;
orderTypeController.occasion = SessionStates.ENTERING_ORDER_TYPE;

export default orderTypeController;
