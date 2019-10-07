'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipmentSchema extends Schema {
  up () {
    this.create('equipment', (table) => {
      table.increments();
      table.string("brand").notNullable();
      table.date("dateOfAcquisition").notNullable();
      table
        .integer("equipCategory_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("equip_categories")
        .onUpdate("CASCADE")
      table
        .integer("laboratory_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("laboratories")
        .onUpdate("CASCADE")
      table
        .integer('specification_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('specifications')
        .onUpdate('CASCADE')
      table.boolean("isDeleted").notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('equipment')
  }
}

module.exports = EquipmentSchema
