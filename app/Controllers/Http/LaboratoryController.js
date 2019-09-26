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
  async index ({ request, response, view }) {
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
   * Render a form to be used for creating a new laboratory.
   * GET laboratories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new laboratory.
   * POST laboratories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single laboratory.
   * GET laboratories/:id
   */
  async show ({ params, request, response, view }) {
    try {
      const lab = await Laboratory.query()
        .where("id", params.id)
        .where("isDeleted", false)
        .fetch();

      const labJSON = lab.toJSON();

      if (Object.keys(labJSON).length === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      return response.status(200).send(labJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
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
