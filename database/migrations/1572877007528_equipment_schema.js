'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipmentSchema extends Schema {
  up () {
    this.table('equipment', (table) => {
      table.boolean("active").notNullable().defaultTo(true);
    })
  }

  down () {
    this.table('equipment', (table) => {
      // reverse alternations
    })
  }
}

module.exports = EquipmentSchema
