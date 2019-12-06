/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CalledsSchema extends Schema {
  up() {
    this.drop(
      'calleds'
    ); /** A tabela referente a Chamado agora se chamará ticket */
  }

  down() {
    this.create('calleds', table => {
      table.increments();
      table.string('description').notNullable();
      table.string('type').notNullable();
      table
        .integer('equipment_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('equipment')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('isDeleted').notNullable();
      table.timestamps();
    });
  }
}

module.exports = CalledsSchema;
