'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipCategory extends Model {
    static get hidden() {
        return ["created_at", "updated_at"];
      }
      equipment() {
        return this.hasOne('App/Models/Equipment')
      }
}

module.exports = EquipCategory
