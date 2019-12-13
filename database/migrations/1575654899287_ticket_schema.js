/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TicketSchema extends Schema {
  up() {
    this.create('tickets', table => {
      table.increments();
      table.string('title', 100).notNullable();
      table.timestamp('opened_at').notNullable();
      table.timestamp('closed_at');
      table
        .boolean('is_deleted')
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('tickets');
  }
}

module.exports = TicketSchema;
