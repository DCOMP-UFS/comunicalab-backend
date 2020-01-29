/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class LabProblem extends Model {
  static boot() {
    super.boot();
    this.addTrait('LogicallyDelete');
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  tickets() {
    return this.manyThrough('App/Model/TicketLaboratory', 'ticket');
  }
}

module.exports = LabProblem;
