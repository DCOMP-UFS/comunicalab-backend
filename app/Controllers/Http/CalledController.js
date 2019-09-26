'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Called = use("App/Model/Called");

/**
 * Resourceful controller for interacting with calleds
 */
class CalledController {
  /**
   * Show a list of all calleds.
   * GET calleds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const data = await Called.query()
        .where("isDeleted", false)
        .fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
  /**
   * Create/save a new called.
   * POST calleds
   */
  async store ({ request, response }) {
    try {
      const data = request.only(["description", "type", "equipment_id"]);
      data.isDeleted = false;
      const called = await Called.create(data);

      return response.status(201).send(called);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single called.
   * GET calleds/:id
   */
  async show ({ params, request, response, view }) {
    try {
      const called = await Called.query()
        .where("id", params.id)
        .where("isDeleted", false)
        .fetch();

      const calledJSON = called.toJSON();

      if (Object.keys(calledJSON).length === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      return response.status(200).send(calledJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }


  /**
   * Update called details.
   * PUT or PATCH calleds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a called with id.
   * DELETE calleds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CalledController
