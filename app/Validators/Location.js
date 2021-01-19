const Antl = use('Antl');

class Location {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      building: 'string|max:100',
      floor: 'string|max:100',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Location;
