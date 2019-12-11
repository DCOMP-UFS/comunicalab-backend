/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ticketsoftwares
 */
class TicketSoftwareController {
  /**
   * Show a list of all ticketsoftwares.
   * GET ticketsoftwares
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
   * Render a form to be used for creating a new ticketsoftware.
   * GET ticketsoftwares/create
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
   * Create/save a new ticketsoftware.
   * POST ticketsoftwares
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    return null;
  }

  /**
   * Display a single ticketsoftware.
   * GET ticketsoftwares/:id
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
   * Render a form to update an existing ticketsoftware.
   * GET ticketsoftwares/:id/edit
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
   * Update ticketsoftware details.
   * PUT or PATCH ticketsoftwares/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    return null;
  }

  /**
   * Delete a ticketsoftware with id.
   * DELETE ticketsoftwares/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    return null;
  }
}

module.exports = TicketSoftwareController;
