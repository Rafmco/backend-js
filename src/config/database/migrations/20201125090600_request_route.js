const dayjs = require("dayjs")

exports.up = function (knex, Promise) {
  return knex.schema.createTable("request_route", table => {
    table.increments("id").primary();
    table.integer("route_id").unsigned().notNullable();
    table.string("description", 250).nullable();
    table.string("url", 250).nullable();
    table.string("note", 250).nullable();

    table.foreign("route_id").references("id").inTable("route");

    table.string("created_by", 15);
    table.timestamp("created_at").nullable();
    table.string("updated_by", 15);
    table.timestamp("updated_at").nullable();
    table.string("deleted_by", 15);
    table.timestamp("deleted_at").nullable();
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user/listar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user/editar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user/exibir/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user-route/telas-usuario/:userId", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user-route/usuarios-tela/:routeId", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user-route/salvar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user-route/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user-request/listar/:userId", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user-request/salvar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/user-request/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/route/listar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/route/salvar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/route/editar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/route/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/route/exibir/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/request-route/listar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/request-route/salvar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/request-route/editar", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/request-route/deletar/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  }).then(() => {
    return knex("request_route").insert({ route_id: 1, url: "/request-route/exibir/:id", description: "", note: "", created_by: "MIGRATE SYSTEM", created_at: dayjs().format("YYYY-MM-DD HH:mm:ss") });
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("request_route")
};
