/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EquipHistorySchema extends Schema {
  up() {
    this.create('equip_histories', table => {
      table.increments();
      table.date('tracked_at').notNullable();
      table.enu('usage_status', ['Disponível', 'Indisponível']).notNullable();
      table.enu('problem_status', ['OK', 'SW', 'HW', 'Rede']).notNullable();
      table
        .integer('equipment_id')
        .unsigned()
        .references('id')
        .inTable('equipments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
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
    this.drop('equip_histories');
  }
}

module.exports = EquipHistorySchema;
