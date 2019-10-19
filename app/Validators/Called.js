'use strict'

const Antl = use("Antl");


class Called {
  get validateAll() {
    return true;
  }
  get rules () {
    return {
      description: "string|max:1000000",
      type: "string|max:45",
      isDeleted: "boolean",
      specification_id: "exists:specifications,id"
    }
  }
  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Called
