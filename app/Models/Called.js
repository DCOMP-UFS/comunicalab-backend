/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Called extends Model {
  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  equipment() {
    return this.belongsTo('App/Models/Equipment');
  }
}

module.exports = Called;
