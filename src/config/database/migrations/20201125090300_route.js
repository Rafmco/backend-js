const dayjs = require("dayjs");

exports.up = function (knex) {
  return knex.schema
    .createTable("route", (table) => {
      table.increments("id").primary();
      table.string("name", 45).nullable();
      table.string("description", 250).nullable();
      table.string("url", 250).nullable();
      table.string("icon", 100).nullable();
      table.string("order", 4).nullable();
      table.integer("parent_id").unsigned().nullable();
      table.string("icon_color", 25).nullable();

      table.string("created_by", 15);
      table.timestamp("created_at").nullable();
      table.string("updated_by", 15);
      table.timestamp("updated_at").nullable();
      table.string("deleted_by", 15);
      table.timestamp("deleted_at").nullable();
    })
    .then(() => {
      return knex("route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "System Settings",
        icon: "mdi-cogs",
        icon_color: "secondary",
        name: "Settings",
        order: "10",
        parent_id: null,
        url: "/settings",
      });
    })
    .then(() => {
      return knex("route").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        description: "System User",
        icon: "mdi-account-tie-outline",
        icon_color: "secondary",
        name: "User",
        order: "11",
        parent_id: 1,
        url: "/user",
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("route");
};
