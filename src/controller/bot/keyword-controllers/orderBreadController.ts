import OrderChainMessages from "@src/view/messages";
import { Controller } from "@src/types/controller";
import { setOrderSession } from "@src/lib/helper/bot";
import buttons from "@view/reply-markups";
import { SessionStates } from "@src/lib/constants/bot/session";
import Keywords from "@src/lib/constants/bot/keywords";
import ControllerTypes from "@src/lib/constants/controllerTypes";

const orderBreadController: Controller = function (ctx) {
  const message = new OrderChainMessages(ctx).orderBread;
  setOrderSession(ctx, {});
  return {
    message,
    replyMarkup: buttons.orderTypeButtons,
    state: SessionStates.ENTERING_ORDER_TYPE,
  };
};

orderBreadController.occasion = Keywords.ORDER_BREAD;
orderBreadController.type = ControllerTypes.KEYWORD;

export default orderBreadController;
