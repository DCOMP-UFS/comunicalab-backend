"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Software = use("App/Models/Software");

/**
 * Resourceful controller for interacting with softwares
 */
class SoftwareController {
  /**
   * Show a list of all softwares.
   * GET softwares
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const data = await Software.query()
        .where("isDelete", false)
        .fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Create/save a new software.
   * POST softwares
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only([
        "name",
        "version",
        "license",
        'specification_id',
        'softCategory_id'
      ]);

      data.isDelete = false;

      const software = await Software.create(data);

      return response.status(201).send(software);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single software.
   * GET softwares/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const software = await Software.query()
        .where("id", params.id)
        .where("isDelete", false)
        .fetch();

      const softwareJSON = software.toJSON();

      if (Object.keys(softwareJSON).length === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      return response.status(200).send(softwareJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update software details.
   * PUT or PATCH softwares/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const software = await Software.query()
        .where("id", params.id)
        .where("isDelete", false)
        .update(data);

      if (software === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      const softwareUpdate = await Software.findOrFail(params.id);

      return response.status(200).send(softwareUpdate);
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
      const software = await Software.query()
        .where("id", params.id)
        .where("isDelete", false)
        .update({ isDelete: true });

      if (software === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      const softwareUpdate = await Software.findOrFail(params.id);

      return response.status(200).send(softwareUpdate);
    } catch (error) {
      console.log(error);
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = SoftwareController;
