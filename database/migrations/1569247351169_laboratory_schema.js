"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LaboratorySchema extends Schema {
  up() {
    this.create("laboratories", table => {
      table.increments();
      table.string("name", 80).notNullable();
      table.string("location").notNullable();
      table.double("latitude").notNullable();
      table.double("longitude").notNullable();
      table.string("status").notNullable();
      table.integer("capacity").notNullable();
      table.boolean("isDeleted").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("laboratories");
  }
}

module.exports = LaboratorySchema;
