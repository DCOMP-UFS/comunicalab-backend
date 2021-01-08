/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Location extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  laboratory() {
    return this.hasMany('App/Models/Laboratory');
  }
}

module.exports = Location;
