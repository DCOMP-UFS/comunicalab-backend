"use strict";

const Antl = use("Antl");

class EquipCategory {
  get validateAll() {
    return true;
  }

  get rules() {
    return {

      name: "string|max:100",
      isDeleted: "boolean"

    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = EquipCategory;
