const Antl = use('Antl');

class UpdateTicket {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'string|max:100',
      opened_at: 'date',
      closed_at: 'date',
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UpdateTicket;
