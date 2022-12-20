import { getControllerResult, getUserId, setOrderSession } from "@src/lib/helper/bot";
import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import { compareEnum, isOrderTypeTomorrow } from "@helper/bot";
import OrderMessages from "@view/messages";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import AlertMessages from "@src/view/messages/AlertMessages";
import Session from "@src/model/Session";

const breadTypeController: Controller = async function (ctx) {
  const entry = ctx.message?.text as string;
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  if (!compareEnum(entry, ButtonLabels.BARBARI, ButtonLabels.SANAQAK))
    return getControllerResult(
      AlertMessages.chooseFromButtons,
      SessionStates.ENTERING_BREAD_TYPE,
      buttons.breadTypeButtons
    );

  await setOrderSession(getUserId(ctx), "breadType", entry);
  return getControllerResult(
    messages.enterBreadAmount(),
    SessionStates.ENTERING_BREAD_AMOUNT,
    buttons.breadAmountButtons
  );
};

breadTypeController.type = ControllerTypes.STATE;
breadTypeController.occasion = SessionStates.ENTERING_BREAD_TYPE;

export default breadTypeController;
