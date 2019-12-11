/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SpecItemSchema extends Schema {
  up() {
    this.create('spec_items', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('value').notNullable();
      table
        .integer('specification_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('specifications')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.boolean('is_deleted').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('spec_items');
  }
}

module.exports = SpecItemSchema;
