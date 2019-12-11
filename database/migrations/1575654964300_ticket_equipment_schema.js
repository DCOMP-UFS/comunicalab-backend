/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TicketEquipmentSchema extends Schema {
  up() {
    this.create('ticket_equipments', table => {
      table.increments();
      table
        .integer('ticket_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tickets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('equipment_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('equipments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('equip_problem_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('equip_problems')
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
    this.drop('ticket_equipments');
  }
}

module.exports = TicketEquipmentSchema;
