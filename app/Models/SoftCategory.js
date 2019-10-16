"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class SoftCategory extends Model {
  static get hidden() {
    return ["created_at", "updated_at"];
  }

  software() {
    return this.hasMany("App/Models/Software");
  }

  specification() {
    return this.hasMany("App/Models/Specification");
  }
}

module.exports = SoftCategory;
