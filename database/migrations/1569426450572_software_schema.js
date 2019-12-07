/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SoftwareSchema extends Schema {
  up() {
    this.create('softwares', table => {
      table.increments();
      table.string('name', 100).notNullable();
      table.string('version', 45).notNullable();
      table.string('license', 45).notNullable();
      table
        .integer('softCategory_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('soft_categories')
        .onUpdate('CASCADE');
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
    this.drop('softwares');
  }
}

module.exports = SoftwareSchema;
