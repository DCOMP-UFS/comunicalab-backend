/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SoftwareOsImage extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  software() {
    return this.belongsTo('App/Models/Software');
  }

  osImage() {
    return this.belongsTo('App/Models/OsImage');
  }
}

module.exports = SoftwareOsImage;
