const Antl = use('Antl');

class Equipment {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      brand: 'string|max:100',
      allocationDate: 'date',
      acquisitionDate: 'date',
      patrimony: 'string|max:100',
      idLaboratory: 'exists:laboratories,id|integer',
      idEquipCategory: 'exists:soft_categories,id|integer',
      idSpecification: 'exists:specifications,id|integer',
      isDeleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Equipment;
