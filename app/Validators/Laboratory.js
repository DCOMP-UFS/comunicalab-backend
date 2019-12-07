const Antl = use('Antl');

class Laboratory {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'string|max:100',
      location: 'string|max:10000',
      // latitude: "exists:location,id",
      // longitude: "double",
      status: 'enum',
      capacity: 'integer',
      active: 'boolean',
      isDeleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Laboratory;
