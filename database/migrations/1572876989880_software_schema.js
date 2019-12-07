/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SoftwareSchema extends Schema {
  up() {
    this.table('softwares', table => {
      table
        .boolean('active')
        .notNullable()
        .defaultTo(true);
    });
  }

  down() {
    this.table('softwares', table => {
      // reverse alternations
    });
  }
}

module.exports = SoftwareSchema;
