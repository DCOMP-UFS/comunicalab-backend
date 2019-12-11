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
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('software_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('software')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('soft_problem_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('soft_problem')
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
