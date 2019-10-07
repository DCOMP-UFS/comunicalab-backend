"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SoftCategorySchema extends Schema {
  up() {
    this.create("soft_categories", table => {
      table.increments();
      table.string("name").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("soft_categories");
  }
}

module.exports = SoftCategorySchema;