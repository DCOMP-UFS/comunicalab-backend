"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EquipCategorySchema extends Schema {
  up() {
    this.create("equip_categories", table => {
      table.increments();
      table.string("name").notNullable();
      table
        .integer("specification_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("specifications")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
      table.timestamps();
    });
  }

  down() {
    this.drop("equip_categories");
  }
}

module.exports = EquipCategorySchema;
