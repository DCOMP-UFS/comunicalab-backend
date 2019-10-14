"use strict";

const Antl = use("Antl");

class Installed {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      software_id: "exists:softwares,id",
      equipment_id: "exists:equipments,id"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Installed;
