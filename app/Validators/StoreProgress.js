const Antl = use('Antl');

class StoreProgress {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      description: 'required|string|max:1000000',
      progressed_at: 'date',
      ticket_id: 'required|exists:tickets,id|integer',
      status: 'required|in:Pendente,Andamento,Finalizado,Cancelado',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = StoreProgress;
