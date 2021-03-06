/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Specification extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  specItems() {
    return this.hasMany('App/Models/SpecItem');
  }

  equipment() {
    return this.hasMany('App/Models/Equipment');
  }
}

module.exports = Specification;
