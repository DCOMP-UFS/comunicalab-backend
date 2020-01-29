/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database');
const Progress = use('App/Models/Progress');
const Ticket = use('App/Models/Ticket');

/**
 * Resourceful controller for interacting with progresses
 */
class ProgressController {
  async updateTicketStatus(id, status, trx) {
    if (!status) {
      const ticketLastProgress = await Progress.query()
        .where('ticket_id', id)
        .orderBy('progressed_at', 'desc')
        .first();
      status = ticketLastProgress.status;
    }
    const ticket = await Ticket.find(id);
    if (
      // ticket is now closed
      ['Finalizado', 'Cancelado'].includes(status) &&
      !ticket.closed_at
    ) {
      await Ticket.query()
        .where('id', id)
        .update({ closed_at: Date.now() }, trx);
    } else if (
      // ticket is no longer closed
      !['Finalizado', 'Cancelado'].includes(status) &&
      ticket.closed_at
    ) {
      await Ticket.query()
        .where('id', id)
        .update({ closed_at: null }, trx);
    }
  }

  /**
   * Show a list of all progresses.
   * GET progresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const progresses = await Progress.query()
        .with('user', builder => {
          builder
            .select('users.id', 'users.username', 'users.email')
            .where('users.is_deleted', false);
        })
        .orderBy('progressed_at', 'asc')
        .fetch();
      return response.status(200).send(progresses);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Create/save a new progress.
   * POST progresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const progressData = request.only([
        'description',
        'progressed_at',
        'ticket_id',
        'status',
      ]);
      if (!progressData.progressed_at) progressData.progressed_at = Date.now();
      progressData.user_id = 1; // TO DO

      const trx = await Database.beginTransaction();
      let progress = await Progress.create(progressData, trx);
      await this.updateTicketStatus(
        progressData.ticket_id,
        progressData.status,
        trx
      );
      trx.commit();
      progress = await Progress.query()
        .where('id', progress.id)
        .with('user', builder => {
          builder
            .select('users.id', 'users.username', 'users.email')
            .where('users.is_deleted', false);
        })
        .with('ticket')
        .first();
      return response.status(201).send(progress);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Display a single progress.
   * GET progresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const progress = await Progress.query()
        .where('id', params.id)
        .with('user', builder => {
          builder.select('users.id', 'users.username', 'users.email');
        })
        .first();

      if (!progress) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(progress);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Update progress details.
   * PUT or PATCH progresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const progressData = request.only([
        'description',
        'progressed_at',
        'status',
      ]);
      const progressOld = await Progress.find(params.id);
      const progress = await Progress.query()
        .where('id', params.id)
        .update(progressData);

      if (progress === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }
      const trx = await Database.beginTransaction();
      await this.updateTicketStatus(progressOld.ticket_id, null, trx);
      trx.commit();
      const progressUpdated = await Progress.query()
        .where('id', params.id)
        .with('user', builder => {
          builder
            .select('users.id', 'users.username', 'users.email')
            .where('users.is_deleted', false);
        })
        .with('ticket')
        .first();

      return response.status(200).send(progressUpdated);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Delete a progress with id.
   * DELETE progresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const progressDeleted = await Progress.find(params.id);
      const progress = await Progress.query()
        .where({
          id: params.id,
        })
        .delete();

      if (progress === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }
      const trx = await Database.beginTransaction();
      await this.updateTicketStatus(progressDeleted.ticket_id, null, trx);
      trx.commit();
      return response.status(200).send(progressDeleted);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }
}

module.exports = ProgressController;
