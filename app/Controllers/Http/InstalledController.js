'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Installed = use("App/Models/Installed");
/**
 * Resourceful controller for interacting with installeds
 */
class InstalledController {
  /**
   * Show a list of all installeds.
   * GET installeds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const data = await Installed.all()
    
      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  
    
    


  }



  /**
   * Create/save a new installed.
   * POST installeds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.only([
        "equipment_id",
        "software_id",
        "dateInstallation"
      ]);

      const installed = await Installed.create(data);

      return response.status(201).send(installed);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single installed.
   * GET installeds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const installed = await Installed.findOrFail(params.id)
      return response.status(200).send(installed);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }


  /**
   * Update installed details.
   * PUT or PATCH installeds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.post();

      const installed = await Installed.query()
        .where("id", params.id)
        .update(data);

      if (installed === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      const installedUpdate = await Installed.findOrFail(params.id);

      return response.status(200).send(installedUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a installed with id.
   * DELETE installeds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = InstalledController
