const Antl = use('Antl');

class Software {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: 'string|max:100',
      affiliate_id: 'exists:affiliation,id',
      email: 'string|max:100',
      password: 'string|max:45',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Software;
