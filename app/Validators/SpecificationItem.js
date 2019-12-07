const Antl = use('Antl');

class SpecificationItem {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      description: 'string|max:1000000',
      value: 'string|max:10000',
      isDeleted: 'boolean',
      specification_id: 'exists:specifications,id',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = SpecificationItem;
