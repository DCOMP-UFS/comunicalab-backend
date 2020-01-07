/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database');
const Ticket = use('App/Models/Ticket');
const Progress = use('App/Models/Progress');
const TicketLaboratory = use('App/Models/TicketLaboratory');
const TicketEquipment = use('App/Models/TicketEquipment');
const TicketSoftware = use('App/Models/TicketSoftware');

/**
 * Resourceful controller for interacting with tickets
 */
class TicketController {
  /**
   * Show a list of all tickets.
   * GET ticket
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response, view }) {
    try {
      let tickets = Ticket.query()
        .with('progresses.user', builder => {
          builder.select('users.id', 'users.username', 'users.email');
        })
        .with('progresses', builder => {
          builder.orderBy('progressed_at', 'asc');
        })
        .where('is_deleted', false);
      if (params.laboratory_id) {
        tickets = tickets.whereHas('laboratories', builder => {
          builder.where('laboratories.id', params.laboratory_id);
        });
      } else if (params.equipment_id) {
        tickets = tickets.whereHas('equipments', builder => {
          builder.where('equipments.id', params.equipment_id);
        });
      } else if (params.software_id) {
        tickets = tickets.whereHas('softwares', builder => {
          builder.where('softwares.id', params.software_id);
        });
      }
      tickets = await tickets.fetch();

      tickets.rows.forEach((ticket, index) => {
        const relations = ticket.$relations;
        [relations.firstProgress] = relations.progresses.rows;
        [relations.lastProgress] = relations.progresses.rows.reverse();
        delete relations.progresses;
      });

      return response.status(200).send(tickets);
    } catch (error) {
      return response.status(500).send({ message: error });
    }
  }

  /**
   * Create/save a new ticket.
   * POST ticket
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const ticketData = request.only(['title']);
      ticketData.opened_at = Date.now();

      const trx = await Database.beginTransaction();
      let ticket = await Ticket.create(ticketData, trx);

      const progressData = request.only([
        'description',
        'user_id',
        'ticket_id',
      ]);
      progressData.progressed_at = ticketData.opened_at;
      progressData.status = 'Pendente';
      progressData.user_id = 1; // TO DO
      progressData.ticket_id = ticket.id;
      const progress = await Progress.create(progressData, trx);
      ticket.firstProgress = progress;

      const ticketLaboratoriesData = [];
      const requestTicketLaboratories = request.input('ticketLaboratories');
      if (requestTicketLaboratories) {
        requestTicketLaboratories.forEach(row => {
          ticketLaboratoriesData.push({
            ticket_id: ticket.id,
            laboratory_id: row.laboratory_id,
            lab_problem_id: row.lab_problem_id,
          });
        });
        await TicketLaboratory.createMany(ticketLaboratoriesData, trx);
      }

      const ticketEquipmentsData = [];
      const requestTicketEquipments = request.input('ticketEquipments');
      if (requestTicketEquipments) {
        requestTicketEquipments.forEach(row => {
          ticketEquipmentsData.push({
            ticket_id: ticket.id,
            equipment_id: row.equipment_id,
            equip_problem_id: row.equip_problem_id,
          });
        });
        await TicketEquipment.createMany(ticketEquipmentsData, trx);
      }

      const ticketSoftwaresData = [];
      const requestTicketSoftwares = request.input('ticketSoftwares');
      if (requestTicketSoftwares) {
        requestTicketSoftwares.forEach(row => {
          ticketSoftwaresData.push({
            ticket_id: ticket.id,
            software_id: row.software_id,
            soft_problem_id: row.soft_problem_id,
          });
        });
        await TicketSoftware.createMany(ticketSoftwaresData, trx);
      }

      trx.commit();
      ticket = await Ticket.query()
        .where({ id: ticket.id })
        .with('progresses.user', builder => {
          builder.select('users.id', 'users.username', 'users.email');
        })
        .with('progresses', builder => {
          builder.orderBy('progressed_at', 'asc');
        })
        .with('ticketLaboratories.problem')
        .with('ticketLaboratories.laboratory')
        .with('ticketLaboratories')
        .with('ticketEquipments.problem')
        // .with('ticketEquipments.equipment')
        .with('ticketEquipments')
        .with('ticketSoftwares.problem')
        .with('ticketSoftwares.software')
        .with('ticketSoftwares')
        .first();

      return response.status(201).send(ticket);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single ticket.
   * GET ticket/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const ticket = await Ticket.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .with('progresses.user', builder => {
          builder.select('users.id', 'users.username', 'users.email');
        })
        .with('progresses', builder => {
          builder.orderBy('progressed_at', 'asc');
        })
        .with('ticketLaboratories.problem')
        .with('ticketLaboratories.laboratory')
        .with('ticketLaboratories')
        .with('ticketEquipments.problem')
        // .with('ticketEquipments.equipment')
        .with('ticketEquipments')
        .with('ticketSoftwares.problem')
        .with('ticketSoftwares.software')
        .with('ticketSoftwares')
        .first();

      if (!ticket) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(ticket);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update ticket details.
   * PUT or PATCH ticket/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const ticket = await Ticket.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (ticket === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const ticketUpdated = await Ticket.findOrFail(params.id);

      return response.status(200).send(ticketUpdated);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a ticket with id.
   * DELETE tickets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const ticket = await Ticket.query()
        .where({ id: params.id, is_deleted: false })
        .update({ is_deleted: true });

      if (ticket === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const ticketDeleted = await Ticket.findOrFail(params.id);

      return response.status(200).send(ticketDeleted);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = TicketController;
