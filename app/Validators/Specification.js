const Antl = use('Antl');

class Specification {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'string|max:100',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Specification;
