/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Laboratory extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  equipment() {
    return this.hasMany('App/Models/Equipment');
  }

  ticketLaboratory() {
    return this.hasMany('App/Models/TicketLaboratory');
  }

  location() {
    return this.belongsTo('App/Models/Location');
  }
}

module.exports = Laboratory;
