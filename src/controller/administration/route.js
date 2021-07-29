const validate = require("validate.js");

/**
 * @author Eder Ferraz Caciano
 * @class Route
 * @description Route Controller Class
 * @param {this} app
 */
module.exports = app => {

  const { hookCreate, hookUpdate, hookDelete } = app.src.middleware.knexHook;

  const SaveValidate = {
    description: { presence: { allowEmpty: false } },
    name: { presence: { allowEmpty: false } },
    url: { presence: { allowEmpty: false } }
  };
  const EditValidate = {
    id: { presence: { allowEmpty: false, numericality: true } },
    ...SaveValidate
  };

  const onList = async (_req, res) => {
    try {
      const findAllRoute = await app.db("route")
        .column(
          "id",
          "name",
          "description",
          "url",
          "icon",
          "order",
          "icon_color"
        )
        .select()
        .where({
          deleted_at: null
        });

      return res.json({ registros: findAllRoute });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onView = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: "Uninformed route!" });

      const findScren = await app.db("route")
        .column(
          "id",
          "name",
          "description",
          "url",
          "icon",
          "order",
          "icon_color"
        )
        .select()
        .where({
          deleted_at: null,
          id: req.params.id
        });

      if (findScren && !findScren.length) return res.json({ erro: "Route not found!" });

      return res.json({ ...findScren[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onSave = async (req, res) => {

    let erro = validate(req.body, SaveValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let route = { ...req.body };
      route.name = route.name ? route.name.toUpperCase() : "";
      route.description = route.description ? route.description.toUpperCase() : "";
      hookCreate(route);

      const findRoute = await app.db("route")
        .where({
          deleted_at: null,
          name: route.name
        });

      if (findRoute && findRoute.length) {
        return res.json({
          erro: "Route already registered!"
        });
      }

      const response = await app.db("route")
        .insert({
          ...route
        });

      return res.json({ message: "Route successfully inserted", routeId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onEdit = async (req, res) => {

    let erro = validate(req.body, EditValidate);
    if (erro) return res.json({ erro: erro });

    try {
      let route = { ...req.body };
      route.name = route.name ? route.name.toUpperCase() : "";
      route.description = route.description ? route.description.toUpperCase() : "";
      hookUpdate(route);

      const findRoute = await app.db("route")
        .where({
          deleted_at: null,
          id: route.id
        });

      if (findRoute && !findRoute.length) return res.json({ erro: "Route not found!" });

      const response = await app.db("route")
        .where({
          deleted_at: null,
          id: route.id
        })
        .update({
          ...route
        });

      return res.json({ message: "Route successfully inserted", routeId: response[0] });
    } catch (error) {
      return res.json({ erro: error });
    }
  };

  const onDelete = async (req, res) => {
    try {
      if (!req.params.id) return res.json({ erro: "Uninformed route!" });

      let route = { id: req.params.id };
      hookDelete(route);

      const findRoute = await app.db("route")
        .where({
          deleted_at: null,
          id: req.params.id
        });
      if (findRoute && !findRoute.length) {
        return res.json({ erro: "Route not found!" });
      }

      await app.db("request_route")
        .where({
          deleted_at: null,
          "request_route.route_id": req.params.id
        })
        .update({
          deleted_at: route.deleted_at,
          deleted_by: route.deleted_by
        });

      await app.db("route")
        .where({
          deleted_at: null,
          id: req.params.id
        })
        .update({
          ...route
        });

      return res.json({ message: "Deleted route!" });
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
