module.exports = app => {

  app.route("/request-route/listar")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .get(app.src.controller.administration.request_route.onList);

  app.route("/request-route/salvar")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .post(app.src.controller.administration.request_route.onSave);

  app.route("/request-route/editar")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .put(app.src.controller.administration.request_route.onEdit);

  app.route("/request-route/deletar/:id")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .delete(app.src.controller.administration.request_route.onDelete);

  app.route("/request-route/exibir/:id")
    .all(app.src.core.passport.authenticate())
    .all(app.src.middleware.authorization.authorization())
    .get(app.src.controller.administration.request_route.onView);

};
