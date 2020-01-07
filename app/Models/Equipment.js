/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Equipment extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  static get table() {
    return 'equipments';
  }

  // installed() {
  //   return this.hasMany('App/Models/Installation');
  // }

  laboratory() {
    return this.belongsTo('App/Models/Laboratory');
  }

  equipCategory() {
    return this.belongsTo('App/Models/EquipCategory');
  }

  specification() {
    return this.belongsTo('App/Models/Specification');
  }

  // ticketEquipment() {
  //   return this.hasMany('App/Models/TicketEquipment');
  // }

  // equipmentOsImage() {
  //   return this.hasMany('App/Models/EquipmentOsImage');
  // }

  // equipmentHistory() {
  //   return this.hasMany('App/Models/EquipmentHistory');
  // }
}

module.exports = Equipment;
