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
        .boolean('is_active')
        .notNullable()
        .defaultTo(true);
      table
        .integer('soft_category_id')
        .unsigned()
        .references('id')
        .inTable('soft_categories')
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
    this.drop('softwares');
  }
}

module.exports = SoftwareSchema;
