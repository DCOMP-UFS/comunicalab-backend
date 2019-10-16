"use strict";

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
  async index({ request, response, view }) {
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
  async store({ request, response }) {
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
  async show({ params, request, response, view }) {
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
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const called = await Called.query()
        .where("id", params.id)
        .where("isDeleted", false)
        .update(data);

      if (called === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      const calledUpdate = await Called.findOrFail(params.id);

      return response.status(200).send(calledUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a called with id.
   * DELETE calleds/:id
   */
  async destroy({ params, request, response }) {
    try {
      const called = await Called.query()
        .where("id", params.id)
        .update({ isDeleted: true });

      if (called === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      const calledDeleted = await Called.findOrFail(params.id);

      return response.status(200).send(calledDeleted);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = CalledController;
