import LocalSession from "telegraf-session-local";

const localSession = new LocalSession({
  database: "session-db.json",
});

export default localSession.middleware();
