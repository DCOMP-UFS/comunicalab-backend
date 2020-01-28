const Antl = use('Antl');

class TicketEquipment {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      ticket_id: 'exists:tickets,id|integer',
      equipment_id: 'exists:equipments,id|integer',
      equip_problem_id: 'exists:equip_problems,id|integer',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = TicketEquipment;
