/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class OsImage extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }
}

module.exports = OsImage;
