/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TicketLaboratorySchema extends Schema {
  up() {
    this.create('ticket_laboratories', table => {
      table.increments();
      table
        .integer('ticket_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tickets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('laboratory_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('laboratories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('lab_problem_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('lab_problems')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .boolean('is_deleted')
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('ticket_laboratories');
  }
}

module.exports = TicketLaboratorySchema;
