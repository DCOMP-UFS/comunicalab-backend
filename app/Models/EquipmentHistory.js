/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class EquipmentHistory extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  equipment() {
    return this.hasOne('App/Models/Equipment');
  }

  static get table() {
    return 'equip_histories';
  }
}

module.exports = EquipmentHistory;
