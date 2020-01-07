/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const SoftProblem = use('App/Models/SoftProblem');

/**
 * Resourceful controller for interacting with softproblems
 */
class SoftProblemController {
  /**
   * Show a list of all softproblems.
   * GET softproblems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const softProblems = await SoftProblem.query()
        .where('is_deleted', false)
        .fetch();

      return response.status(200).send(softProblems);
    } catch (error) {
      return response.status(500).send({ message: error });
    }
  }

  /**
   * Create/save a new softproblem.
   * POST softproblems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const softProblemData = request.only(['name']);
      const softProblem = await SoftProblem.create(softProblemData);

      return response.status(201).send(softProblem);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single softproblem.
   * GET softproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const softProblem = await SoftProblem.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .first();

      if (!softProblem) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(softProblem);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update softproblem details.
   * PUT or PATCH softproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const softProblem = await SoftProblem.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (softProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const softProblemUpdated = await SoftProblem.findOrFail(params.id);

      return response.status(200).send(softProblemUpdated);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a softproblem with id.
   * DELETE softproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const softProblem = await SoftProblem.query()
        .where({ id: params.id, is_deleted: false })
        .update({ is_deleted: true });

      if (softProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const softProblemDeleted = await SoftProblem.findOrFail(params.id);

      return response.status(200).send(softProblemDeleted);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = SoftProblemController;
