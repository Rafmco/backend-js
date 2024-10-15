const dayjs = require("dayjs");

exports.up = function (knex) {
  return knex.schema
    .createTable("request_route", table => {
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
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user/listar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user/editar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user/deletar/:id",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user/exibir/:id",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user-route/telas-usuario/:userId",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user-route/usuarios-tela/:routeId",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user-route/salvar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user-route/deletar/:id",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user-request/listar/:userId",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user-request/salvar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/user-request/deletar/:id",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/route/listar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/route/salvar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/route/editar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/route/deletar/:id",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/route/exibir/:id",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/request-route/listar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/request-route/salvar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/request-route/editar",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/request-route/deletar/:id",
      });
    })
    .then(() => {
      return knex("request_route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "",
        note: "",
        route_id: 1,
        url: "/request-route/exibir/:id",
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("request_route");
};
