const validate = require("validate.js");

/**
 * @author Eder Ferraz Caciano
 * @class User Route
 * @description User Route Controller Class
 * @param {this} app
 */
module.exports = app => {

  const { hookCreate, hookDelete } = app.src.middleware.knexHook;

  const SaveValidate = {
    route_id: { presence: { allowEmpty: false, numericality: true } },
    user_id: { presence: { allowEmpty: false, numericality: true } }
  };

  // listar usuários da tela
  const onListRoutesOfUser = async (req, res) => {
    try {
      await app.db
        .select(
          "user_route.id",
          "user.id as userId",
          "route.name as routeName",
          "route.description as routeDescription",
          "route.url as routerTo",
          "route.icon as icon",
          "route.order as order",
          "route.icon_color as iconColor"
        )
        .from("user_route")
        .leftJoin("route", "route.id", "user_route.route_id")
        .leftJoin("user", "user.id", "user_route.user_id")
        .where({
          "route.deleted_at": null,
          "user_route.deleted_at": null,
          "user_route.user_id": req.params.userId
        })
        .then(resp => res.json({ registros: resp }))
        .catch(err => res.json({ registros: err }));

    } catch (error) {
      return res.json({ erro: error });
    }
  };

  //listar telas do usuário
  const onListUsersOfRoute = async (req, res) => {
    try {
      await app.db
        .select(
          "user_route.id",
          "route.id as routeId",
          "user.id as userId",
          "user.name as userName",
          "user.login as userLogin"
        )
        .from("user_route")
        .leftJoin("route", "route.id", "user_route.route_id")
        .leftJoin("user", "user.id", "user_route.user_id")
        .where({
          "route.deleted_at": null,
          "user_route.deleted_at": null,
          "user_route.route_id": req.params.routeId,
        })
        .then(resp => res.json({ registros: resp }))
        .catch(err => res.json({ registros: err }));

    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onSave = async (req, res) => {
    let erro = validate(req.body, SaveValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let routeUser = {};
      routeUser.user_id = req.body.user_id ? Number(req.body.user_id) : undefined;
      routeUser.route_id = req.body.route_id ? Number(req.body.route_id) : undefined;
      hookCreate(routeUser);

      const findUser = await app.db("user")
        .where({
          deleted_at: null,
          id: routeUser.user_id
        });

      if (findUser && !findUser.length) return res.json({ erro: "User not found!" });

      const findRoute = await app.db("route")
        .where({
          deleted_at: null,
          id: routeUser.route_id
        });

      if (findRoute && !findRoute.length) return res.json({ erro: "Route not found!" });

      const findRelationship = await app.db("user_route")
        .where({
          deleted_at: null,
          route_id: routeUser.route_id,
          user_id: routeUser.user_id
        });

      if (findRelationship && findRelationship.length) {
        return res.json({ erro: "User already has this route!" });
      }

      const response = await app.db("user_route")
        .insert({
          ...routeUser
        });

      return res.json({ message: "Route inserted for the user successfull!", routeId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onDelete = async (req, res) => {
    try {
      let userRoute = { id: req.params.id };
      hookDelete(userRoute);

      const findUserRoute = await app.db("user_route")
        .where({
          deleted_at: null,
          id: userRoute.id
        });

      if (findUserRoute && !findUserRoute.length) {
        return res.json({ erro: "User Route not found!" });
      }

      await app.db("user_route")
        .where({
          deleted_at: null,
          id: userRoute.id
        })
        .update({
          ...userRoute
        });

      return res.json({ message: "Deleted user route!" });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  return {
    onDelete,
    onListRoutesOfUser,
    onListUsersOfRoute,
    onSave
  };
};
