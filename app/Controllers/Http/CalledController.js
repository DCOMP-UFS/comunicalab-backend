'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Called = use("App/Models/Called");

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

}

module.exports = CalledController
