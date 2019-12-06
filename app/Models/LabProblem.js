/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class LabProblem extends Model {
  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  tickets() {
    return this.manyThrough('App/Model/TicketLaboratory', 'ticket');
  }
}

module.exports = LabProblem;
