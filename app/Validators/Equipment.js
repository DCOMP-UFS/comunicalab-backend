const Antl = use('Antl');

class Equipment {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      brand: 'string|max:100',
      isDeleted: 'boolean',
      equipCategory_id: 'exists:equip_categories,id',
      laboratory_id: 'exists:laboratories,id',
      specification_id: 'exists:specifications,id',
      active: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Equipment;
