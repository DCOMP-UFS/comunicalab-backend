/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class EquipmentOsImage extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  equipment() {
    return this.hasOne('App/Models/Equipment');
  }
}

module.exports = EquipmentOsImage;
