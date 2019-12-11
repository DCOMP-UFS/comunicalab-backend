/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Installation extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  equipment() {
    return this.belongsTo('App/Models/Equipment');
  }

  software() {
    return this.belongsTo('App/Models/Software');
  }
}

module.exports = Installation;
