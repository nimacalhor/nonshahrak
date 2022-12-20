import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import User from "@src/model/User";
import Session from "@src/model/Session";

const orderConfirmationRController: Controller = async function (ctx) {
  const messages = new OrderMessages(await Session.find().byCtx(ctx), await isOrderTypeTomorrow(getUserId(ctx)));
  const user = await User.find().byUserId(getUserId(ctx));
  if (user)
    return getControllerResult(
      messages.getProfileConfirmation(user),
      SessionStates.PROFILE_CONFIRMATION,
      buttons.profileConfirmButtons
    );
  return getControllerResult(
    messages.getUnit(),
    SessionStates.ENTERING_UNIT,
    buttons.enterUnitButtons
  );
};

orderConfirmationRController.type = ControllerTypes.RETURN;
orderConfirmationRController.occasion = SessionStates.ORDER_CONFIRMATION;

export default orderConfirmationRController;
