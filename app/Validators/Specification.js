"use strict";

const Antl = use("Antl");

class Specification {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      softCategory_id: "in:exists:soft_categories,id,null",
      eqipCategory_id: "in:exists:equip_categories,id,null",
      isDeleted: "boolean"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Specification;
