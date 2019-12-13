/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InstallationSchema extends Schema {
  up() {
    this.create('installation', table => {
      table.increments();
      table.timestamp('installed_at').notNullable();
      table
        .integer('software_id')
        .unsigned()
        .references('id')
        .inTable('softwares')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('equipment_id')
        .unsigned()
        .references('id')
        .inTable('equipments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .boolean('is_deleted')
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('installation');
  }
}

module.exports = InstallationSchema;
