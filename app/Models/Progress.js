/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Progress extends Model {
  static boot() {
    super.boot();
    this.addTrait('LogicallyDelete');
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'is_deleted'];
  }

  static get dates() {
    return super.dates.concat(['progressed_at']);
  }

  ticket() {
    return this.belongsTo('App/Models/Ticket');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Progress;
