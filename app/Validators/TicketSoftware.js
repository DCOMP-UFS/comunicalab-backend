const Antl = use('Antl');

class TicketSoftware {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      ticket_id: 'exists:tickets,id|integer',
      software_id: 'exists:softwares,id|integer',
      soft_problem_id: 'exists:soft_problems,id|integer',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = TicketSoftware;
