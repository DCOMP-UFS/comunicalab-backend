'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CalledSchema extends Schema {
  up () {
    this.create('calleds', (table) => {
      table.increments()
      table.string("description").notNullable();
      table.string("type").notNullable();
      table
        .integer("equipment_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("equipment")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
      table.boolean("isDeleted").notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('calleds')
  }
}

module.exports = CalledSchema
