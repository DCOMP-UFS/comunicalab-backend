const Antl = use('Antl');

class Equipment {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      brand: 'string|max:100',
      allocated_at: 'date',
      acquired_at: 'date',
      asset_tag: 'string|max:100',
      laboratory_id: 'exists:laboratories,id|integer',
      equip_category_id: 'exists:equip_categories,id|integer',
      specification_id: 'exists:specifications,id|integer',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Equipment;
