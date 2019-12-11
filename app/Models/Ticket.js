/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Ticket extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  laboratories() {
    return this.manyThrough('App/Model/TicketLaboratory', 'laboratory');
  }

  softwares() {
    return this.manyThrough('App/Models/TicketSoftware', 'software');
  }

  equipments() {
    return this.manyThrough('App/Models/TicketEquipment', 'equipment');
  }

  labProblems() {
    return this.manyThrough('App/Model/TicketLaboratory', 'problem');
  }

  softProblems() {
    return this.manyThrough('App/Model/TicketSoftware', 'problem');
  }

  equipProblems() {
    return this.manyThrough('App/Model/TicketEquipment', 'problem');
  }
}

module.exports = Ticket;
