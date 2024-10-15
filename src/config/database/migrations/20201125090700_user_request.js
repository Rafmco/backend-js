const dayjs = require("dayjs");

exports.up = function (knex) {
  return knex.schema
    .createTable("user_request", table => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.integer("request_id").unsigned().notNullable();

      table.foreign("user_id").references("id").inTable("user");
      table.foreign("request_id").references("id").inTable("request_route");

      table.string("created_by", 15);
      table.timestamp("created_at").nullable();
      table.string("updated_by", 15);
      table.timestamp("updated_at").nullable();
      table.string("deleted_by", 15);
      table.timestamp("deleted_at").nullable();
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 1,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 2,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 3,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 4,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 5,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 6,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 7,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 8,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 9,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 10,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 11,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 12,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 13,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 14,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 15,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 16,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 17,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 18,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 19,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 20,
        user_id: 1,
      });
    })
    .then(() => {
      return knex("user_request").insert({
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        created_by: "MIGRATE SYSTEM",
        request_id: 21,
        user_id: 1,
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_request");
};
