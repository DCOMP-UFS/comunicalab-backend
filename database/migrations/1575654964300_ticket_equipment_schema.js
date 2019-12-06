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
        .inTable('ticket')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('equipment_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('equipment')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('equip_problem_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('equip_problem')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.unique(['ticket_id', 'equipment_id', 'equip_problem_id']);
      table.timestamps();
    });
  }

  down() {
    this.drop('ticket_equipments');
  }
}

module.exports = TicketEquipmentSchema;
