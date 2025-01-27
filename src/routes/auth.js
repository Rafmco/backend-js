/* eslint-disable no-undef */
const dayjs = require("dayjs");
const jwt = require("jwt-simple");

module.exports = (app) => {
  app.route("/login").post(app.src.controller.auth.login);
  app.route("/resetPassword").post(app.src.controller.auth.resetPassword);
  app.route("/validateToken").post(app.src.controller.auth.validateToken);
  app
    .route("/setNotificationToken")
    .post(app.src.controller.auth.setNotificationToken);

  app.all("/*", async (req, res, next) => {
    let token =
      req.headers && req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

    if (token) {
      let decoded = jwt.decode(String(token), process.env.APP_KEY);
      const tokenExpirada = decoded.exp < Math.floor(dayjs() / 1000);

      if (tokenExpirada === false) {
        next();
      } else {
        return res.status(401).send({ erro: "Usuário não autorizado." });
      }
    } else {
      next();
    }
  });
};
