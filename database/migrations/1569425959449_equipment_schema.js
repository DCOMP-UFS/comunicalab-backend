/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EquipmentSchema extends Schema {
  up() {
    this.create('equipment', table => {
      table.increments();
      table.string('brand', 80).notNullable();
      table.date('allocationDate').notNullable();
      table.date('acquisitionDate').notNullable();
      table.string('patrimony', 100).notNullable();
      table.boolean('isDeleted').notNullable().defaultTo(false);
      table.integer('idLaboratory').notNullable()
                                   .unsigned()
                                   .notNullable()
                                   .references('id')
                                   .inTable('laboratories')
                                   .onUpdate('CASCADE');
      table.integer('idEquipCategory').notNullable()
                                      .unsigned()
                                      .notNullable()
                                      .references('id')
                                      .inTable('equip_categories')
                                      .onUpdate('CASCADE');
      table.integer('idSpecification').notNullable()
                                      .unsigned()
                                      .notNullable()
                                      .references('id')
                                      .inTable('specifications')
                                      .onUpdate('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('equipment');
  }
}

module.exports = EquipmentSchema;
