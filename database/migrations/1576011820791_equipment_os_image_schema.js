/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EquipmentOsImageSchema extends Schema {
  up() {
    this.create('equipment_os_images', table => {
      table.increments();
      table
        .integer('equipment_id')
        .unsigned()
        .references('id')
        .inTable('equipments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('os_image_id')
        .unsigned()
        .references('id')
        .inTable('os_images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamp('installed_at');
      table
        .boolean('is_deleted')
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('equipment_os_images');
  }
}

module.exports = EquipmentOsImageSchema;
