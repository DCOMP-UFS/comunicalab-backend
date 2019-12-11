/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SpecItem extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  specification() {
    return this.belongsTo('App/Models/Specification');
  }
}

module.exports = SpecItem;
