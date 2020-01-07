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
      const equipProblems = await EquipProblem.query()
        .where('is_deleted', false)
        .fetch();

      return response.status(200).send(equipProblems);
    } catch (error) {
      return response.status(500).send({ message: error });
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
      return response.status(error.status).send({ message: error });
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
        .where('is_deleted', false)
        .first();

      if (!equipProblem) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(equipProblem);
    } catch (error) {
      return response.status(error.status).send({ message: error });
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
      const data = request.post();

      const equipProblem = await EquipProblem.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (equipProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const equipProblemUpdated = await EquipProblem.findOrFail(params.id);

      return response.status(200).send(equipProblemUpdated);
    } catch (error) {
      return response.status(error.status).send({ message: error });
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
      const equipProblem = await EquipProblem.query()
        .where({ id: params.id, is_deleted: false })
        .update({ is_deleted: true });

      if (equipProblem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const equipProblemDeleted = await EquipProblem.findOrFail(params.id);

      return response.status(200).send(equipProblemDeleted);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = EquipProblemController;
