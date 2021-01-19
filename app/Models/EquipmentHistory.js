/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class EquipmentHistory extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  static get table() {
    return 'equip_histories'
  }

  equipment() {
    return this.hasOne('App/Models/Equipment');
  }
}

module.exports = EquipmentHistory;
