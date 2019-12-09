/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InstalledSchema extends Schema {
  up() {
    this.create('installeds', table => {
      table.increments();
      table.date('dateInstallation').notNullable();
      table
        .integer('software_id')
        .unsigned()
        .references('id')
        .inTable('softwares')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('equipment_id')
        .unsigned()
        .references('id')
        .inTable('equipment')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('installeds');
  }
}

module.exports = InstalledSchema;
