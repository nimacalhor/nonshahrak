import Commands from "@src/lib/constants/bot/commands";
import { SessionStates } from "@src/lib/constants/bot/session";
import ControllerTypes from "@src/lib/constants/controllerTypes";
import { isOrderTypeTomorrow, setOrderSession } from "@src/lib/helper/bot";
import { Controller } from "@src/types/controller";
import OrderMessages from "@src/view/messages";
import buttons from "@view/reply-markups";

const startController: Controller = function (ctx) {
  const isTomorrow = isOrderTypeTomorrow(ctx);
  const message = new OrderMessages(ctx, isTomorrow).botProcessMessage;
  setOrderSession(ctx, {});
  return {
    message,
    replyMarkup: buttons.mainButtons,
    state: SessionStates.UNDEFINED,
  };
};

startController.occasion = Commands.START;
startController.type = ControllerTypes.COMMAND;

export default startController;
