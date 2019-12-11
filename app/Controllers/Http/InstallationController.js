/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Installation = use('App/Models/Installation');
/**
 * Resourceful controller for interacting with installations
 */
class InstallationController {
  /**
   * Show a list of all installations.
   * GET installations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const data = await Installation.all();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Create/save a new installation.
   * POST installations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only([
        'installed_at',
        'equipment_id',
        'software_id',
      ]);

      const installation = await Installation.create(data);

      return response.status(201).send(installation);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single installation.
   * GET installations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const installation = await Installation.findOrFail(params.id);
      return response.status(200).send(installation);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update installation details.
   * PUT or PATCH installations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const installation = await Installation.query()
        .where('id', params.id)
        .update(data);

      if (installation === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const installationUpdate = await Installation.findOrFail(params.id);

      return response.status(200).send(installationUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a installation with id.
   * DELETE installations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const installation = await Installation.findOrFail(params.id);
    await installation.delete();
  }
}

module.exports = InstallationController;
