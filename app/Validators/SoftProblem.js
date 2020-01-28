const Antl = use('Antl');

class SoftProblem {
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

module.exports = SoftProblem;
