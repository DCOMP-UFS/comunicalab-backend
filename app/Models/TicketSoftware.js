/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TicketSoftware extends Model {
  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  problem() {
    return this.hasOne('App/Model/SoftProblem');
  }

  ticket() {
    return this.hasOne('App/Model/Ticket');
  }

  software() {
    return this.hasOne('App/Model/Software');
  }
}

module.exports = TicketSoftware;
