'use strict'

class SpecificationItem {
  get validateAll() {
    return true;
  }

  get rules () {
    return {
      name: "string|max:45",
      value: "string|max:45",
      isDeleted: "boolean",
      specification_id: "exists:specifications,id"
    }
  }
  get messages() {
    return Antl.list("validation");
  }
}

module.exports = SpecificationItem
