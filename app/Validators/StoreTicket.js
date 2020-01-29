const Antl = use('Antl');

class StoreTicket {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required|string|max:100',
      description: 'required|string|max:1000000',
      ticketLaboratories:
        'required_without_all:ticketEquipments,ticketSoftwares|array|min:1',
      ticketEquipments:
        'required_without_all:ticketLaboratories,ticketSoftwares|array|min:1',
      ticketSoftwares:
        'required_without_all:ticketEquipments,ticketLaboratories|array|min:1',
      'ticketLaboratories.*.laboratory_id':
        'required|exists:laboratories,id|integer',
      'ticketLaboratories.*.lab_problem_id':
        'required|exists:lab_problems,id|integer',
      'ticketEquipments.*.equipment_id':
        'required|exists:equipments,id|integer',
      'ticketEquipments.*.equip_problem_id':
        'required|exists:equip_problems,id|integer',
      'ticketSoftwares.*.software_id': 'required|exists:softwares,id|integer',
      'ticketSoftwares.*.soft_problem_id':
        'required|exists:soft_problems,id|integer',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = StoreTicket;
