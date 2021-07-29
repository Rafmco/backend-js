const dayjs = require("dayjs")

exports.up = function (knex, Promise) {
  return knex.schema.createTable("user_route", table => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.integer("route_id").unsigned().notNullable();

    table.foreign("user_id").references("id").inTable("user");
    table.foreign("route_id").references("id").inTable("route");

    table.string("created_by", 15);
    table.timestamp("created_at").nullable();
    table.string("deleted_by", 15);
    table.timestamp("deleted_at").nullable();
  }).then(() => {
    return knex("user_route").insert({
      created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      created_by: "MIGRATE SYSTEM",
      route_id: 1,
      user_id: 1
    })
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("user_route")
};
