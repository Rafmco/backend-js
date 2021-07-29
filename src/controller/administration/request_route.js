const validate = require("validate.js");

/**
 * @author Eder Ferraz Caciano
 * @class Request-Route
 * @description Request-Route Controller Class
 * @param {this} app
 */
module.exports = app => {

  const { hookCreate, hookUpdate, hookDelete } = app.src.middleware.knexHook;

  const SaveValidate = {
    description: { presence: { allowEmpty: false } },
    note: { presence: { allowEmpty: false } },
    route_id: { presence: { allowEmpty: false, numericality: true } },
    url: { presence: { allowEmpty: false } },
  };

  const EditValidate = {
    id: { presence: { allowEmpty: false, numericality: true } },
    ...SaveValidate
  };

  const onList = async (_req, res) => {
    try {
      const findAllRoute = await app.db("request_route")
        .join("route", "request_route.route_id", "=", "route.id")
        .select(
          "request_route.id",
          "request_route.route_id",
          "route.name",
          "request_route.description",
          "request_route.url",
          "request_route.note"
        )
        .where({
          "request_route.deleted_at": null,
          "route.deleted_at": null
        });

      return res.json({ registros: findAllRoute });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onView = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: "Uninformed request!" });

      const findScrenn = await app.db("request_route")
        .join("route", "request_route.route_id", "=", "route.id")
        .select(
          "request_route.id",
          "request_route.route_id",
          "route.name",
          "request_route.description",
          "request_route.url",
          "request_route.note"
        )
        .where({
          "request_route.deleted_at": null,
          "request_route.id": req.params.id,
          "route.deleted_at": null
        });

      if (findScrenn && !findScrenn.length) return res.json({ erro: "Request not found!" });

      return res.json({ ...findScrenn[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onSave = async (req, res) => {
    let erro = validate(req.body, SaveValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let route = { ...req.body };
      route.note = route.note ? route.note.toUpperCase() : "";
      route.description = route.description ? route.description.toUpperCase() : "";
      hookCreate(route);

      const findRoute = await app.db("route")
        .where({
          deleted_at: null,
          id: route.route_id
        });

      if (findRoute && !findRoute.length) {
        return res.json({ erro: "Route not found!" });
      }

      const findRequest = await app.db("request_route")
        .where({
          deleted_at: null,
          route_id: route.route_id,
          url: route.url
        });

      if (findRequest && findRequest.length) {
        return res.json({ erro: "Request already registered!" });
      }

      const response = await app.db("request_route")
        .insert({
          ...route
        });

      return res.json({ message: "Request successfully inserted", routeId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onEdit = async (req, res) => {
    let erro = validate(req.body, EditValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let route = { ...req.body };
      route.note = route.note ? route.note.toUpperCase() : "";
      route.description = route.description ? route.description.toUpperCase() : "";
      hookUpdate(route);

      const findRoute = await app.db("route")
        .where({
          deleted_at: null,
          id: route.route_id
        });

      if (findRoute && !findRoute.length) {
        return res.json({ erro: "Route not found!" });
      }

      const findRequest = await app.db("request_route")
        .where({
          deleted_at: null,
          id: route.id
        });

      if (findRequest && !findRequest.length) {
        return res.json({ erro: "Request not found!" });
      }

      const response = await app.db("request_route")
        .where({
          deleted_at: null,
          id: route.id
        })
        .update({
          ...route
        });

      return res.json({ message: "Request successfully inserted", requestId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onDelete = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: "Uninformed request!" });

      let route = { id: req.params.id };
      hookDelete(route);

      const findRoute = await app.db("request_route")
        .where({
          deleted_at: null,
          id: req.params.id
        });

      if (findRoute && !findRoute.length) return res.json({ erro: "Request not found!" });

      await app.db("request_route")
        .where({
          deleted_at: null,
          id: req.params.id
        })
        .update({
          ...route
        });

      return res.json({ message: "Deleted request!" });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  return {
    onDelete,
    onEdit,
    onList,
    onSave,
    onView
  };
};
