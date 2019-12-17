/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TicketEquipment extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  problem() {
    return this.belongsTo('App/Models/EquipProblem');
  }

  ticket() {
    return this.belongsTo('App/Models/Ticket');
  }

  equipment() {
    return this.belongsTo('App/Models/Equipment');
  }
}

module.exports = TicketEquipment;
