"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Equipment extends Model {
  installed() {
    return this.hasMany("App/Models/Installed");
  }
}

module.exports = Equipment;
