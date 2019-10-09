"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const SoftCategory = use("App/Models/SoftCategory");

/**
 * Resourceful controller for interacting with softcategories
 */
class SoftCategoryController {
  /**
   * Show a list of all softcategories.
   * GET softcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    console.log("sa");
  }

  /**
   * Create/save a new softcategory.
   * POST softcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(["name"]);

      data.isDeleted = false;

      const software = await SoftCategory.creeate(data);

      return response.status(201).send(software);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single softcategory.
   * GET softcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update softcategory details.
   * PUT or PATCH softcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a softcategory with id.
   * DELETE softcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = SoftCategoryController;
