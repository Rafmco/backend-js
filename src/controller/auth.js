/* eslint-disable no-undef */
const dayjs = require("dayjs");
const jwt = require("jwt-simple");
const validate = require("validate.js");

module.exports = (app) => {
  const userValidate = {
    login: { presence: { allowEmpty: false } },
    password: { presence: { allowEmpty: false } },
  };

  const login = async (req, res) => {
    const erros = validate(req.body, userValidate);
    if (erros) return res.json({ erro: erros });

    try {
      const user = { ...req.body };

      const findUser = await app
        .db("user")
        .select(
          "user.id",
          "user.name",
          "user.login",
          "user.password",
          app.db.raw(
            "IF(user.expiration_date < now(), 1, 0) AS expiredPassword"
          ),
          "user.email",
          "user.url_photograph"
        )
        .whereNull("user.deleted_at")
        .where({
          login: user.login,
          password: user.password,
        })
        .first();

      if (!findUser) return res.json({ erro: "User not found!" });

      if (String(req.body.password) !== String(findUser.password)) {
        return res.json({ erro: "User or password not found!" });
      }

      // User_Route
      const findUserRoutes = await app
        .db("user_route")
        .select(
          "route.id",
          "route.name",
          "route.url",
          "route.icon",
          "route.order",
          "route.parent_id",
          "route.icon_color"
        )
        .innerJoin("route", function () {
          this.onNull("route.deleted_at").andOn(
            "route.id",
            "user_route.route_id"
          );
        })
        .whereNull("user_route.deleted_at")
        .where({
          "user_route.user_id": findUser.id,
        });

      /*
        jwt-simple Expiration time
        https://github.com/hokaccha/node-jwt-simple/issues/50
       */
      const now = Math.floor(Date.now() / 1000);
      const payload = {
        id: findUser.id,
        name: findUser.name,
        login: findUser.login,
        email: findUser.email,
        userImage: findUser.url_photograph,
        expiredPassword: findUser.expiredPassword,
        route: findUserRoutes,
        exp: (now + 60) * 60,
        iat: now,
      };

      res.json({
        ...payload,
        token: jwt.encode(payload, process.env.APP_KEY),
      });
    } catch (error) {
      // res.send({ aviso: "Request error.", erro: error });
      return res.json({ erro: error });
    }
  };

  const resetPassword = async (req, res) => {
    const erros = validate(req.body, userValidate);
    if (erros) return res.json({ erro: erros });

    try {
      console.log(req.body, "resetPassword");
      const user = { ...req.body };

      const findUser = await app
        .db("user")
        .first()
        .whereNull("user.deleted_at")
        .where({
          login: user.login,
          password: user.password,
        });

      if (!findUser) return res.json({ erro: "User not found!" });

      const date = new Date(Date.now());
      date.setMonth(date.getMonth() + 1);

      await app
        .db("user")
        .whereNull("user.deleted_at")
        .where({
          login: user.login,
          password: user.password,
        })
        .update({
          password: user.confirmacao,
          expiration_date: date.toJSON().slice(0, 10), // Vencimento em 2 meses
        });

      return res.json({ message: "Password Reset" });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const validateToken = async (req) => {
    let token =
      req.headers && req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;
    if (token) {
      let decoded = jwt.decode(String(token), process.env.APP_KEY);
      const tokenExpirada = decoded.exp < Math.floor(dayjs() / 1000);

      if (tokenExpirada === false) {
        return true;
      }

      return false;
    }
  };

  const setNotificationToken = async (req, res) => {
    try {
      console.log(req.body, "setNotificationToken");
      const user = { ...req.body };

      const findUser = await app
        .db("user")
        .first()
        .whereNull("user.deleted_at")
        .where({
          login: user.login,
        });

      if (!findUser) return res.json({ erro: "User not found!" });

      // Set Notification_Token
      await app
        .db("user")
        .whereNull("user.deleted_at")
        .where({
          login: user.login,
        })
        .update({
          notification_token: user.notification_token,
        });

      return res.json({ message: "Notification Token Set" });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  return { login, resetPassword, validateToken, setNotificationToken };
};
