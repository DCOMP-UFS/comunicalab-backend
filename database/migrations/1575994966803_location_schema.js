/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LocationSchema extends Schema {
  up() {
    this.create('locations', table => {
      table.increments();
      table.string('building', 80).notNullable();
      table.string('floor', 10).notNullable();
      table.boolean('is_deleted').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('locations');
  }
}

module.exports = LocationSchema;
