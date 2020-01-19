/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PermSchema extends Schema {
  up() {
    this.create('perm', table => {
      table.increments();
      table.string('route', 128);
      table.enu('method', ['GET', 'POST', 'PUT', 'DELETE']).notNullable();
      table
        .boolean('is_deleted')
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('perm');
  }
}

module.exports = PermSchema;
