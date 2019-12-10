/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TicketSoftwareSchema extends Schema {
  up() {
    this.create('ticket_softwares', table => {
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
        .integer('software_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('software')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('soft_problem_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('soft_problem')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('is_deleted').notNullable();
      table.unique(['ticket_id', 'software_id', 'soft_problem_id']);
      table.timestamps();
    });
  }

  down() {
    this.drop('ticket_softwares');
  }
}

module.exports = TicketSoftwareSchema;
