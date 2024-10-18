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

      /*
        jwt-simple Expiration time
        https://github.com/hokaccha/node-jwt-simple/issues/50
       */
      const now = Math.floor(Date.now() / 1000);
      const payload = {
        email: findUser.email,
        exp: (now + 60) * 60,
        iat: now,
        id: findUser.id,
        login: findUser.login,
        name: findUser.name,
      };

      res.json({
        ...payload,
        token: jwt.encode(payload, process.env.APP_KEY),
      });
    } catch (error) {
      res.send({ aviso: "Request error.", erro: error });
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

  return { login, validateToken };
};
