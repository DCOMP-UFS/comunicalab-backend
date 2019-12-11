const Antl = use('Antl');

class SpecItem {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      description: 'string|max:1000000',
      value: 'string|max:10000',
      is_deleted: 'boolean',
      specification_id: 'exists:specifications,id',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = SpecItem;
