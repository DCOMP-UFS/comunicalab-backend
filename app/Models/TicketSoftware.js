/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TicketSoftware extends Model {
  static boot() {
    super.boot();
    this.addTrait('LogicallyDelete');
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  problem() {
    return this.belongsTo('App/Models/SoftProblem');
  }

  ticket() {
    return this.belongsTo('App/Models/Ticket');
  }

  software() {
    return this.belongsTo('App/Models/Software');
  }
}

module.exports = TicketSoftware;
