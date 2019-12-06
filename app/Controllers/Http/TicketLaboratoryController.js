/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ticketlaboratories
 */
class TicketLaboratoryController {
  /**
   * Show a list of all ticketlaboratories.
   * GET ticketlaboratories
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
   * Render a form to be used for creating a new ticketlaboratory.
   * GET ticketlaboratories/create
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
   * Create/save a new ticketlaboratory.
   * POST ticketlaboratories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    return null;
  }

  /**
   * Display a single ticketlaboratory.
   * GET ticketlaboratories/:id
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
   * Render a form to update an existing ticketlaboratory.
   * GET ticketlaboratories/:id/edit
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
   * Update ticketlaboratory details.
   * PUT or PATCH ticketlaboratories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    return null;
  }

  /**
   * Delete a ticketlaboratory with id.
   * DELETE ticketlaboratories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    return null;
  }
}

module.exports = TicketLaboratoryController;
