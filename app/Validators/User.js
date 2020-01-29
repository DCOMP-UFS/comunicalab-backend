const Antl = use('Antl');

class Software {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: 'string|max:100|unique:users, username',
      affiliation_id: 'exists:affiliations,id',
      email: 'string|max:100|unique:users,email',
      password: 'string|min:6',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Software;
