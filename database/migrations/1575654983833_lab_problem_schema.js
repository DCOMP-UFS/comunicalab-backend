/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LabProblemSchema extends Schema {
  up() {
    this.create('lab_problems', table => {
      table.increments();
      table.string('name').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('lab_problems');
  }
}

module.exports = LabProblemSchema;
