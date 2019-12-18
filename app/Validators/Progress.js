const validations = use('indicative/validatons');
const Antl = use('Antl');

class Progress {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      description: 'required|string|max:1000000',
      progressed_at: 'date',
      ticket_id: 'required|exists:tickets,id|integer',
      user_id: 'required|exists:users,id|integer',
      status: validations.regex(['Pendente|Andamento|Finalizado|Cancelado']),
      is_deleted: 'boolean',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Progress;
