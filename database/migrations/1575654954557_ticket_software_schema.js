/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TicketSoftwareSchema extends Schema {
  up() {
    this.create('ticket_softwares', table => {
      table.increments();
      table
        .integer('ticket_id')
        .unsigned()
        .references('id')
        .inTable('tickets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('software_id')
        .unsigned()
        .references('id')
        .inTable('softwares')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('soft_problem_id')
        .unsigned()
        .references('id')
        .inTable('soft_problems')
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
    this.drop('ticket_softwares');
  }
}

module.exports = TicketSoftwareSchema;
