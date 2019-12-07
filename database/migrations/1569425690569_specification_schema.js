/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SpecificationSchema extends Schema {
  up() {
    this.create('specifications', table => {
      table.increments();
      table
        .integer('softCategory_id')
        .unsigned()
        .references('id')
        .inTable('soft_categories')
        .onUpdate('CASCADE');
      table
        .integer('eqipCategory_id')
        .unsigned()
        .references('id')
        .inTable('equip_categories')
        .onUpdate('CASCADE');
      table.boolean('isDeleted').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('specifications');
  }
}

module.exports = SpecificationSchema;
