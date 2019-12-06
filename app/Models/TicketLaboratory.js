/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TicketLaboratory extends Model {
  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  problem() {
    return this.hasOne('App/Model/LabProblem');
  }

  ticket() {
    return this.hasOne('App/Model/Ticket');
  }

  laboratory() {
    return this.hasOne('App/Model/Laboratory');
  }
}

module.exports = TicketLaboratory;
