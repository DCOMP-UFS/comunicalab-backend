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
      const now = Date.now();
      const progressData = request.only([
        'description',
        'progressed_at',
        'ticket_id',
        'status',
      ]);
      if (!progressData.progressed_at) progressData.progressed_at = now;
      progressData.user_id = 1; // TO DO

      const trx = await Database.beginTransaction();

      const progress = await Progress.create(progressData, trx);

      if (['Finalizado', 'Cancelado'].includes(progressData.status)) {
        await Ticket.query()
          .where('id', progressData.ticket_id)
          .update({ closed_at: now }, trx);
      } else
        await Ticket.query()
          .where('id', progressData.ticket_id)
          .update({ closed_at: null }, trx);

      trx.commit();
      progress.ticket = await Ticket.query()
        .where('id', progressData.ticket_id)
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
      const data = request.only(['description', 'progressed_at', 'status']);

      const progress = await Progress.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (progress === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const progressUpdated = await Progress.findOrFail(params.id);

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
      return response.status(200).send(progressDeleted);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }
}

module.exports = ProgressController;
