'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LaboratorySchema extends Schema {
  up () {
    this.table('laboratories', (table) => {
      table.dropColumn("latitude");
      table.dropColumn("longitude");
      table.boolean("active").notNullable().defaultTo(true);
    })
  }

  down () {
    this.table('laboratories', (table) => {
      // reverse alternations
    })
  }
}

module.exports = LaboratorySchema
