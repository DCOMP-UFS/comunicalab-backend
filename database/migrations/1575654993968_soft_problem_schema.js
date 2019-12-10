/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SoftProblemSchema extends Schema {
  up() {
    this.create('soft_problems', table => {
      table.increments();
      table.string('name').notNullable();
      table.boolean('is_deleted').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('soft_problems');
  }
}

module.exports = SoftProblemSchema;
