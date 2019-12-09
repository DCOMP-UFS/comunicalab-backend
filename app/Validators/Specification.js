const Antl = use('Antl');

class Specification {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      softCategory_id: 'exists:soft_categories,id',
      eqipCategory_id: 'exists:equip_categories,id',
      isDeleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Specification;
