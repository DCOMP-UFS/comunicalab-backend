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
        .inTable('ticket')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('laboratory_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('laboratory')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('lab_problem_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('lab_problem')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.unique(['ticket_id', 'laboratory_id', 'lab_problem_id']);
      table.timestamps();
    });
  }

  down() {
    this.drop('ticket_laboratories');
  }
}

module.exports = TicketLaboratorySchema;
