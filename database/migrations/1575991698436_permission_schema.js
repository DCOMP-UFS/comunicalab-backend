/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PermissionSchema extends Schema {
  up() {
    this.create('permissions', table => {
      table.increments();
      table.string('route', 128);
      table.enu('method', ['GET', 'POST', 'PUT', 'DELETE']).notNullable();
      table.boolean('is_deleted').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('permissions');
  }
}

module.exports = PermissionSchema;
