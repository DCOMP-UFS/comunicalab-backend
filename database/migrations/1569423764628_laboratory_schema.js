/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LaboratorySchema extends Schema {
  up() {
    this.create('laboratories', table => {
      table.increments();
      table.string('name', 80).notNullable();
      table.integer('capacity').notNullable();
      table.boolean('is_in_use').notNullable();
      table.date('occupied_at');
      table
        .integer('location_id')
        .unsigned()
        .references('id')
        .inTable('locations')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .boolean('is_deleted')
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('laboratories');
  }
}

module.exports = LaboratorySchema;
