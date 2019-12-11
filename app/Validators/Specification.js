const Antl = use('Antl');

class Specification {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      soft_category_id: 'exists:soft_categories,id',
      equip_category_id: 'exists:equip_categories,id',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Specification;
