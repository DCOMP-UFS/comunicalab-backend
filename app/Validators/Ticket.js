const Antl = use('Antl');

class Ticket {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required|string|max:1000000',
      opened_at: 'date',
      closed_at: 'date',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Ticket;
