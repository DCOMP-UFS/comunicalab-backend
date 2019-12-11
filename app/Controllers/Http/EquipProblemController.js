/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

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
    return null;
  }

  /**
   * Render a form to be used for creating a new equipproblem.
   * GET equipproblems/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return null;
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
    return null;
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
    return null;
  }

  /**
   * Render a form to update an existing equipproblem.
   * GET equipproblems/:id/edit
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
   * Update equipproblem details.
   * PUT or PATCH equipproblems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    return null;
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
    return null;
  }
}

module.exports = EquipProblemController;
