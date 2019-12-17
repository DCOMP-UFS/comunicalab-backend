/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Ticket = use('App/Models/Ticket');

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
  async index({ request, response, view }) {
    try {
      const tickets = await Ticket.query()
        .with('progresses.user', builder => {
          builder.select('users.id', 'users.username', 'users.email');
        })
        .with('progresses', builder => {
          builder.orderBy('progressed_at', 'asc');
        })
        .where('is_deleted', false)
        .fetch();
      tickets.rows.forEach((ticket, index) => {
        const relations = ticket.$relations;
        [relations.first_progress] = relations.progresses.rows;
        [relations.last_progress] = relations.progresses.rows.reverse();
        delete relations.progresses;
      });
      return response.status(200).send(tickets);
    } catch (error) {
      return response.status(error.status).send({ message: error });
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
      const data = request.only(['description']);
      data.is_deleted = false;
      const ticket = await Ticket.create(data);

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
        // .with('ticketLaboratories.laboratory')
        .with('ticketLaboratories')
        .with('ticketSoftwares.problem')
        // .with('ticketSoftwares.software')
        .with('ticketSoftwares')
        .with('ticketEquipments.problem')
        // .with('ticketEquipments.equipment')
        .with('ticketEquipments')
        .fetch();

      const ticketJSON = ticket.toJSON();

      if (Object.keys(ticketJSON).length === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(ticketJSON[0]);
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
        .where('id', params.id)
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
