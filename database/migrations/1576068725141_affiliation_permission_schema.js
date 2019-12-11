/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AffiliationPermissionSchema extends Schema {
  up() {
    this.create('affiliation_permissions', table => {
      table.increments();
      table
        .integer('affiliation_id')
        .unsigned()
        .references('id')
        .inTable('affiliations')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('permission_id')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.boolean('is_deleted').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('affiliation_permissions');
  }
}

module.exports = AffiliationPermissionSchema;
