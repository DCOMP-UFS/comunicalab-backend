/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AffiliationSchema extends Schema {
  up() {
    this.create('affiliations', table => {
      table.increments();
      table.string('name', 40).notNullable();
      table.boolean('is_deleted').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('affiliations');
  }
}

module.exports = AffiliationSchema;
