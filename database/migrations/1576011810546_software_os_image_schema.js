/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SoftwareOsImageSchema extends Schema {
  up() {
    this.create('software_os_images', table => {
      table.increments();
      table
        .integer('software_id')
        .unsigned()
        .references('id')
        .inTable('softwares')
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
      table
        .boolean('is_deleted')
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('software_os_images');
  }
}

module.exports = SoftwareOsImageSchema;
