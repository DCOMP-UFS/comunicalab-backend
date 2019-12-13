const Antl = use('Antl');

class Ticket {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'string|max:1000000',
      is_deleted: 'boolean',
      specification_id: 'exists:specifications,id',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Ticket;
