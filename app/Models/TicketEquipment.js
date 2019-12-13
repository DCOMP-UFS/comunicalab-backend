/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TicketEquipment extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  problem() {
    return this.hasOne('App/Model/EquipProblem');
  }

  ticket() {
    return this.hasOne('App/Model/Ticket');
  }

  equipment() {
    return this.hasOne('App/Model/Equipment');
  }
}

module.exports = TicketEquipment;
