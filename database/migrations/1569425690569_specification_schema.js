/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SpecificationSchema extends Schema {
  up() {
    this.create('specifications', table => {
      table.increments();
      table.string('name', 100).notNullable();
      table
        .boolean('is_deleted')
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('specifications');
  }
}

module.exports = SpecificationSchema;
