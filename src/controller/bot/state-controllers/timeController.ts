import { SessionStates } from "@constants/bot/session";
import ControllerTypes from "@constants/controllerTypes";
import { Controller } from "@t/controller";
import buttons from "@view/reply-markups";
import {
  isOrderTypeTomorrow,
  getControllerResult,
  setOrderSession,
  getUserId,
} from "@helper/bot";
import OrderMessages from "@view/messages";
import { END_WORK_HOUR, START_WORK_HOUR } from "@src/lib/constants/bot/general";
import AlertMessages from "@src/view/messages/AlertMessages";
import User from "@src/model/User";

const timeController: Controller = async function (ctx) {
  const entry = ctx.entry;
  const hour = parseInt(entry);
  if (isNaN(hour))
    return getControllerResult(
      AlertMessages.timeFormatError,
      SessionStates.ENTERING_TIME,
      buttons.enterTimeButtons
    );
  if (!(hour > START_WORK_HOUR) || !(hour < END_WORK_HOUR))
    return getControllerResult(
      AlertMessages.timePeriodErr,
      SessionStates.ENTERING_TIME,
      buttons.enterTimeButtons
    );
  await setOrderSession(ctx, ctx.userId, "time", entry);
  const messages = new OrderMessages(ctx.session, ctx.isTomorrow)
  const userId = ctx.userId;
  const user = await User.find().byUserId(userId);
  if (!user)
    return getControllerResult(
      messages.enterName(),
      SessionStates.ENTERING_NAME,
      buttons.enterNameButtons
    );
  return getControllerResult(
    messages.getProfileConfirmation(user),
    SessionStates.PROFILE_CONFIRMATION,
    buttons.profileConfirmButtons
  );
};

timeController.type = ControllerTypes.STATE;
timeController.occasion = SessionStates.ENTERING_TIME;

export default timeController;
