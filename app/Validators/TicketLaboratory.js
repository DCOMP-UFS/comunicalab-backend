const Antl = use('Antl');

class TicketLaboratory {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      ticket_id: 'exists:tickets,id|integer',
      laboratory_id: 'exists:laboratories,id|integer',
      lab_problem_id: 'exists:lab_problems,id|integer',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = TicketLaboratory;
