/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const EquipProblem = use('App/Models/EquipProblem');

/**
 * Resourceful controller for interacting with equipproblems
 */
class EquipProblemController {
  /**
   * Show a list of all equipproblems.
   * GET equipproblems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const equipProblems = await EquipProblem.query().fetch();

      return response.status(200).send(equipProblems);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Create/save a new equipproblem.
   * POST equipproblems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const equipProblemData = request.only(['name']);
      const equipProblem = await EquipProblem.create(equipProblemData);

      return response.status(201).send(equipProblem);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Display a single equipproblem.
   * GET equipproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const equipProblem = await EquipProblem.query()
        .where('id', params.id)
        .first();

      if (!equipProblem) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(equipProblem);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Update equipproblem details.
   * PUT or PATCH equipproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.only(['name']);

      const equipProblem = await EquipProblem.query()
        .where('id', params.id)
        .update(data);

      if (equipProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const equipProblemUpdated = await EquipProblem.findOrFail(params.id);

      return response.status(200).send(equipProblemUpdated);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }

  /**
   * Delete a equipproblem with id.
   * DELETE equipproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const equipProblemDeleted = await EquipProblem.find(params.id);
      const equipProblem = await EquipProblem.query()
        .where({ id: params.id })
        .delete();

      if (equipProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(equipProblemDeleted);
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error });
      return response.status(500).send({ message: error.toString() });
    }
  }
}

module.exports = EquipProblemController;
