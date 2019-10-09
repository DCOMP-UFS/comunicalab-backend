"use strict";

const Antl = use("Antl");

class SoftCategory {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required|string|max:100"
    };
  }

  get messages() {
    return Antl.list("valitadion");
  }
}

module.exports = SoftCategory;
