'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const EquipCategory = use("App/Models/EquipCategory");
/**
 * Resourceful controller for interacting with equipcategories
 */
class EquipCategoryController {
  /**
   * Show a list of all equipcategories.
   * GET equipcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const data = await EquipCategory.query()
        .where("isDeleted", false)
        .fetch();


      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Render a form to be used for creating a new equipcategory.
   * GET equipcategories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new equipcategory.
   * POST equipcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single equipcategory.
   * GET equipcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const equipCategory = await EquipCategory.query()
        .where("id", params.id)
        .where("isDeleted", false)
        .fetch();


      const equipCategoryJSON = equipCategory.toJSON();

      if (Object.keys(equipCategoryJSON).length === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      return response.status(200).send(equipCategoryJSON[0]);

    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Render a form to update an existing equipcategory.
   * GET equipcategories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update equipcategory details.
   * PUT or PATCH equipcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a equipcategory with id.
   * DELETE equipcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EquipCategoryController
