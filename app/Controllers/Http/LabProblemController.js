/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const LabProblem = use('App/Models/LabProblem');

/**
 * Resourceful controller for interacting with labproblems
 */
class LabProblemController {
  /**
   * Show a list of all labproblems.
   * GET labproblems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const labProblems = await LabProblem.query().fetch();

      return response.status(200).send(labProblems);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Create/save a new labproblem.
   * POST labproblems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const labProblemData = request.only(['name']);
      const labProblem = await LabProblem.create(labProblemData);

      return response.status(201).send(labProblem);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Display a single labproblem.
   * GET labproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const labProblem = await LabProblem.query()
        .where('id', params.id)
        .first();

      if (!labProblem) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(labProblem);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Update labproblem details.
   * PUT or PATCH labproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.only(['name']);

      const labProblem = await LabProblem.query()
        .where('id', params.id)
        .update(data);

      if (labProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const labProblemUpdated = await LabProblem.findOrFail(params.id);

      return response.status(200).send(labProblemUpdated);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Delete a labproblem with id.
   * DELETE labproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const labProblemDeleted = await LabProblem.find(params.id);
      const labProblem = await LabProblem.query()
        .where({ id: params.id, is_deleted: false })
        .delete();

      if (labProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(labProblemDeleted);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }
}

module.exports = LabProblemController;
