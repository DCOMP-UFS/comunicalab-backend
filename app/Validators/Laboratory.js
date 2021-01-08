const Antl = use('Antl');

class Laboratory {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'string|max:80',
      capacity: 'integer',
      is_in_use: 'boolean',
      occupied_at: 'date',
      location_id: 'exists:locations,id|integer',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Laboratory;
