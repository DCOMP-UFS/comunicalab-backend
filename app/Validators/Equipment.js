const Antl = use('Antl');

class Equipment {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      active: 'boolean',
      brand: 'string|max:100',
      allocationDate: validations.dateFormat(['DD/MM/YYYY']),
      acquisitionDate: validations.dateFormat(['DD/MM/YYYY']),
      patrimony:  'string|max:100',
      idLaboratory: 'integer',
      idEquipCategory: 'integer',
      idSpecification: 'integer',
      isDeleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Equipment;
