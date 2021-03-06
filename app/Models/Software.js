/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Software extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  installed() {
    return this.hasMany('App/Models/Installation');
  }

  softCategory() {
    return this.belongsTo('App/Models/SoftCategory');
  }

  specification() {
    return this.belongsTo('App/Models/Specification');
  }
}

module.exports = Software;
