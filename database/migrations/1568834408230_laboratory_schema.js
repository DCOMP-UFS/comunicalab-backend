'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LaboratorySchema extends Schema {
  up () {
    this.create('laboratories', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('location').notNullable()
      table.float('latitude').notNullable()
      table.float('longitude').notNullable()
      table.string('status').notNullable()
      table.integer('capacity').notNullable()
      table.boolean('isDelete').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('laboratories')
  }
}

module.exports = LaboratorySchema
