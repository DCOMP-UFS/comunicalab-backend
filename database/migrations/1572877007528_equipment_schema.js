/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EquipmentSchema extends Schema {
  up() {
    this.table('equipment', table => {
      table
        .boolean('active').notNullable().defaultTo(true);
        table.string('brand', 80).notNullable();
        table.datetime('allocationDate') .notNullable;
        table.datetime('acquisitionDate') .notNullable;
        table.string('patrimony', 100).notNullable();
        table.boolean('isDeleted').notNullable().defaultTo(false);
        table.integer('idLaboratory').notNullable();
        table.integer('idEquipCategory').notNullable();
        table.integer('idSpecification').notNullable();
    });
  }

  down() {
    this.table('equipment', table => {
      // reverse alternations
    });
  }
}

module.exports = EquipmentSchema;
