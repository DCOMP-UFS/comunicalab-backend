/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SoftProblem extends Model {
  static boot() {
    super.boot();
    this.addTrait('LogicallyDelete');
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  tickets() {
    return this.manyThrough('App/Model/TicketSoftware', 'ticket');
  }
}

module.exports = SoftProblem;
