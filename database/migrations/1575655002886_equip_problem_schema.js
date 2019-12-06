/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EquipProblemSchema extends Schema {
  up() {
    this.create('equip_problems', table => {
      table.increments();
      table.string('name').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('equip_problems');
  }
}

module.exports = EquipProblemSchema;
