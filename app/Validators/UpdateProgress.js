const Antl = use('Antl');

class UpdateProgress {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      description: 'string|max:1000000',
      progressed_at: 'date',
      ticket_id: 'exists:tickets,id|integer',
      user_id: 'exists:users,id|integer',
      status: 'in:Pendente,Andamento,Finalizado,Cancelado',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UpdateProgress;
