"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class EquipCategory extends Model {
  static get hidden() {
    return ["created_at", "updated_at"];
  }

  equipment() {
    return this.hasMany("App/Models/Equipment");
  }

  specification() {
    return this.hasMany("App/Models/Specification");
  }
}

module.exports = EquipCategory;
