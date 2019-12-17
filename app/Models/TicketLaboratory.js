/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TicketLaboratory extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  problem() {
    return this.belongsTo('App/Models/LabProblem');
  }

  ticket() {
    return this.belongsTo('App/Models/Ticket');
  }

  laboratory() {
    return this.belongsTo('App/Models/Laboratory');
  }
}

module.exports = TicketLaboratory;
