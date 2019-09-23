"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SpecificationSchema extends Schema {
  up() {
    this.create("specifications", table => {
      table.increments();
      table.string("name").notNullable();
      table.string("value").notNullable();
      table
        .integer("softCategory_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("soft_categories")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("equipCategory_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("equip_categories")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("specifications");
  }
}

module.exports = SpecificationSchema;
