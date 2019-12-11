/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class EquipProblem extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  tickets() {
    return this.manyThrough('App/Model/TicketEquipment', 'ticket');
  }
}

module.exports = EquipProblem;
