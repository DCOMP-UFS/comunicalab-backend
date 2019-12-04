/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SpecificationItemSchema extends Schema {
  up() {
    this.create('specification_items', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('value').notNullable();
      table
        .integer('specification_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('specifications')
        .onUpdate('CASCADE');
      table.boolean('isDeleted').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('specification_items');
  }
}

module.exports = SpecificationItemSchema;
