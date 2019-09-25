'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Laboratory = use("App/Models/Laboratory");

/**
 * Resourceful controller for interacting with laboratories
 */
class LaboratoryController {
  /**
   * Show a list of all laboratories.
   * GET laboratories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({response}) {
    try {
      const data = await Laboratory.query()
        .where("isDeleted", false)
        .fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
  /**
   * Create/save a new laboratory.
   * POST laboratories
   */
  async store ({ request, response }) {
    try {
      const data = request.only(["name", "location","latitude", "longitude", "status", "capacity"]);
      data.isDeleted = false;
      const lab = await Software.create(data);

      return response.status(201).send(lab);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single laboratory.
   * GET laboratories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing laboratory.
   * GET laboratories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update laboratory details.
   * PUT or PATCH laboratories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a laboratory with id.
   * DELETE laboratories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LaboratoryController
