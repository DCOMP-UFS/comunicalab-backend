/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProgressSchema extends Schema {
  up() {
    this.create('progresses', table => {
      table.increments();
      table.text('description').notNullable();
      table.date('progressed_at').notNullable();
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
      table
        .enu('status', ['Pendente', 'Andamento', 'Finalizado', 'Cancelado'])
        .notNullable();
      table.boolean('is_deleted').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('progresses');
  }
}
module.exports = ProgressSchema;
