import OrderChainMessages from "@src/view/messages";
import { Controller } from "@src/types/controller";
import buttons from "@view/reply-markups";
import { SessionStates } from "@src/lib/constants/bot/session";
import Keywords from "@src/lib/constants/bot/keywords";
import ControllerTypes from "@src/lib/constants/controllerTypes";

const orderBreadController: Controller = async function (ctx) {
  const message = new OrderChainMessages(null)
    .orderBread;

  return {
    message,
    replyMarkup: buttons.orderTypeButtons,
    state: SessionStates.ENTERING_ORDER_TYPE,
  };
};

orderBreadController.occasion = Keywords.ORDER_BREAD;
orderBreadController.type = ControllerTypes.KEYWORD;

export default orderBreadController;
