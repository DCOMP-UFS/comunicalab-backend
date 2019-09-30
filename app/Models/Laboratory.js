'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Laboratory extends Model {
    static get hidden() {
        return ["created_at", "updated_at"];
      }

    equipment() {
        return this.hasMany('App/Models/Equipment');
      }
}

module.exports = Laboratory
