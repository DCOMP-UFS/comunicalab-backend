const Antl = use('Antl');

class EquipProblem {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required|string|max:100',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = EquipProblem;
