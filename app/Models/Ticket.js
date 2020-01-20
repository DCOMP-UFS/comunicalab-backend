/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Ticket extends Model {
  static boot() {
    super.boot();
    this.addTrait('LogicallyDelete');
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  static get dates() {
    return super.dates.concat(['opened_at', 'closed_at']);
  }

  laboratories() {
    return this.manyThrough('App/Models/TicketLaboratory', 'laboratory');
  }

  softwares() {
    return this.manyThrough('App/Models/TicketSoftware', 'software');
  }

  equipments() {
    return this.manyThrough('App/Models/TicketEquipment', 'equipment');
  }

  ticketLaboratories() {
    return this.hasMany('App/Models/TicketLaboratory');
  }

  ticketSoftwares() {
    return this.hasMany('App/Models/TicketSoftware');
  }

  ticketEquipments() {
    return this.hasMany('App/Models/TicketEquipment');
  }

  progresses() {
    return this.hasMany('App/Models/Progress');
  }

  labProblems() {
    return this.manyThrough('App/Models/TicketLaboratory', 'problem');
  }

  softProblems() {
    return this.manyThrough('App/Models/TicketSoftware', 'problem');
  }

  equipProblems() {
    return this.manyThrough('App/Models/TicketEquipment', 'problem');
  }

  users() {
    return this.manyThrough('App/Models/Progress', 'user');
  }
}

module.exports = Ticket;
