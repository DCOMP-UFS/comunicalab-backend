/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TicketRatingSchema extends Schema {
  up() {
    this.create('ticket_ratings', table => {
      table.increments();
      table.integer('plus_minus_one').notNullable();
      table
        .integer('ticket_id')
        .unsigned()
        .references('id')
        .inTable('tickets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('ticket_ratings');
  }
}

module.exports = TicketRatingSchema;
