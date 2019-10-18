"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EquipCategorySchema extends Schema {
  up() {
    this.create("equip_categories", table => {
      table.increments();
      table.string("name").notNullable();
      table.boolean("isDeleted").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("equip_categories");
  }
}

module.exports = EquipCategorySchema;
