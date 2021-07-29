module.exports = app => {

  app.route("/user-route/telas-usuario/:userId")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .get(app.src.controller.administration.user_route.onListRoutesOfUser);

  app.route("/user-route/usuarios-tela/:routeId")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .get(app.src.controller.administration.user_route.onListUsersOfRoute);

  app.route("/user-route/salvar")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .post(app.src.controller.administration.user_route.onSave);

  app.route("/user-route/deletar/:id")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .delete(app.src.controller.administration.user_route.onDelete);

};
