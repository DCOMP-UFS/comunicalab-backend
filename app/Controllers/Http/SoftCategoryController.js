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

    try {
      const data = await SoftCategory.query()
        .where("isDeleted", false)
        .fetch();


      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }

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

      const softCategory = await SoftCategory.create(data);

      return response.status(201).send(softCategory);

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

  async show({ params, request, response, view }) {
    try {
      const softCategory = await SoftCategory.query()
        .where("id", params.id)
        .where("isDeleted", false)
        .fetch();


      const softCategoryJSON = softCategory.toJSON();

      if (Object.keys(softCategoryJSON).length === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      return response.status(200).send(softCategoryJSON[0]);

    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }


  /**
   * Delete a software with id.
   * DELETE softwares/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async update({ params, request, response }) {
    try {
      const data = request.post();

      const softCategory = await SoftCategory.query()
        .where("id", params.id)
        .where("isDeleted", false)
        .update(data);

      if (softCategory === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      const softCategoryUpdate = await SoftCategory.findOrFail(params.id);

      return response.status(200).send(softCategoryUpdate);
    } catch (error) {

      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a software with id.
   * DELETE softwares/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const softCategory = await SoftCategory.query()
        .where("id", params.id)
        .where("isDeleted", false)
        .update({ isDeleted: true });

      if (softCategory === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      const softCategoryUpdate = await SoftCategory.findOrFail(params.id);

      return response.status(200).send(softCategoryUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

}

module.exports = SoftCategoryController;
