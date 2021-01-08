const Antl = use('Antl');

class OsImage {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'string|max:100',
      built_at: 'date',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = OsImage;
