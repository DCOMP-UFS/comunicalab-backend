/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const OsImage = use('App/Models/OsImage');

/**
 * Resourceful controller for interacting with osimages
 */
class OsImageController {
  /**
   * Show a list of all osImages.
   * GET osimages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const data = await OsImage.query()
        .where('is_deleted', false)
        .fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Create/save a new os_image.
   * POST os_images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['name', 'built_at']);
      data.is_deleted = false;

      const osImage = await OsImage.create(data);

      return response.status(201).send(osImage);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single osImage.
   * GET osimages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const osImage = await OsImage.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .fetch();

      const osImageJSON = osImage.toJSON();

      if (Object.keys(osImageJSON).length === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(osImageJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update os_image details.
   * PUT or PATCH osimages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const osImage = await OsImage.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (osImage === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const osImageUpdate = await OsImage.findOrFail(params.id);

      return response.status(200).send(osImageUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a os_image with id.
   * DELETE osimages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const osImage = await OsImage.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update({ is_deleted: true });

      if (osImage === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const osImageUpdate = await OsImage.findOrFail(params.id);

      return response.status(200).send(osImageUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = OsImageController;
