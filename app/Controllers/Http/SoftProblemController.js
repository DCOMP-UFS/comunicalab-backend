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
      const softProblems = await SoftProblem.query().fetch();

      return response.status(200).send(softProblems);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
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
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
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
        .first();

      if (!softProblem) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(softProblem);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
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
      const data = request.only(['name']);

      const softProblem = await SoftProblem.query()
        .where('id', params.id)
        .update(data);

      if (softProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const softProblemUpdated = await SoftProblem.findOrFail(params.id);

      return response.status(200).send(softProblemUpdated);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
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
      const softProblemDeleted = await SoftProblem.find(params.id);
      const softProblem = await SoftProblem.query()
        .where({ id: params.id })
        .delete();

      if (softProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(softProblemDeleted);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }
}

module.exports = SoftProblemController;
