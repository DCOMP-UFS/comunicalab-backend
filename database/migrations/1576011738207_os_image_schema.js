/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OsImageSchema extends Schema {
  up() {
    this.create('os_images', table => {
      table.increments();
      table.string('name', 64).notNullable();
      table.timestamp('built_at').notNullable();
      table
        .boolean('is_deleted')
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('os_images');
  }
}

module.exports = OsImageSchema;
