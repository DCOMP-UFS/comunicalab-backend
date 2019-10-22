"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class SpecificationItem extends Model {
  static get hidden() {
    return ["created_at", "updated_at"];
  }

  specification() {
    return this.belongsTo("App/Models/Specification");
  }
}

module.exports = SpecificationItem;
