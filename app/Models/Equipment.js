/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Equipment extends Model {
  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  installed() {
    return this.hasMany('App/Models/Installed');
  }

  laboratory() {
    return this.belongsTo('App/Models/Laboratory');
  }

  equipCategory() {
    return this.belongsTo('App/Models/EquipCategory');
  }

  specification() {
    return this.belongsTo('App/Models/Specification');
  }
}

module.exports = Equipment;
