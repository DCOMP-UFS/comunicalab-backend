"use strict";

const Antl = use("Antl");

class Software {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "string|max:100",
      version: "string|max:45",
      license: "string|max:45",
      isDeleted: "boolean",
      softCategory_id: "exists:soft_categories,id",
      specification_id: "exists:specifications,id"
    };
  }

  get messages() {
    return Antl.list("valitadion");
  }
}

module.exports = Software;
