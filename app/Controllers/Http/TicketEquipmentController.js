/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ticketequipments
 */
class TicketEquipmentController {
  /**
   * Show a list of all ticketequipments.
   * GET ticketequipments
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
   * Render a form to be used for creating a new ticketequipment.
   * GET ticketequipments/create
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
   * Create/save a new ticketequipment.
   * POST ticketequipments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    return null;
  }

  /**
   * Display a single ticketequipment.
   * GET ticketequipments/:id
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
   * Render a form to update an existing ticketequipment.
   * GET ticketequipments/:id/edit
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
   * Update ticketequipment details.
   * PUT or PATCH ticketequipments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    return null;
  }

  /**
   * Delete a ticketequipment with id.
   * DELETE ticketequipments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    return null;
  }
}

module.exports = TicketEquipmentController;
