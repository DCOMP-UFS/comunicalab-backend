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
          builder.select('users.id', 'users.username', 'users.email');
        })
        .orderBy('progressed_at', 'asc')
        .where('is_deleted', false)
        .fetch();
      return response.status(200).send(progresses);
    } catch (error) {
      return response.status(error.status).send({ message: error });
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

      const ticket = await Ticket.query()
        .where('id', progressData.ticket_id)
        .where('is_deleted', false)
        .first();

      if (!ticket) {
        return response.status(400).send({
          message: `Ticket with id ${progressData.ticket_id} no longer exists.`,
        });
      }

      const trx = await Database.beginTransaction();

      const progress = await Progress.create(progressData, trx);

      if (progressData.status in ['Finalizado', 'Cancelado'])
        await ticket.update({ closed_at: now }, trx);
      else await ticket.update({ closed_at: null }, trx);

      trx.commit();
      progress.ticket = ticket;
      return response.status(201).send(progress);
    } catch (error) {
      return response.status(error.status).send({ message: error });
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
    return null;
  }

  /**
   * Render a form to update an existing progress.
   * GET progresses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    return null;
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
    return null;
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
    return null;
  }
}

module.exports = ProgressController;
