/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const SoftwareOsImage = use('App/Models/SoftwareOsImage');

/**
 * Resourceful controller for interacting with softwareosimages
 */
class SoftwareOsImageController {
  /**
   * Show a list of all softwareosimages.
   * GET softwareosimages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const data = await SoftwareOsImage.query()
        .where('is_deleted', false)
        .fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Create/save a new software_os_image.
   * POST softwareosimages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['software_id', 'os_image_id']);

      data.is_deleted = false;

      const softwareOsImage = await SoftwareOsImage.create(data);

      return response.status(201).send(softwareOsImage);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single softwareOsImage.
   * GET softwareosimages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const softwareOsImage = await SoftwareOsImage.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .fetch();

      const softwareOsImageJSON = softwareOsImage.toJSON();

      if (Object.keys(softwareOsImageJSON).length === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(softwareOsImageJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update software_os_image details.
   * PUT or PATCH softwareosimages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const softwareOsImage = await SoftwareOsImage.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (softwareOsImage === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const softwareOsImageUpdate = await SoftwareOsImage.findOrFail(params.id);

      return response.status(200).send(softwareOsImageUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a softwareOsImage with id.
   * DELETE softwareosimages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const softwareOsImage = await SoftwareOsImage.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update({ is_deleted: true });

      if (softwareOsImage === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const softwareOsImageUpdate = await SoftwareOsImage.findOrFail(params.id);

      return response.status(200).send(softwareOsImageUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = SoftwareOsImageController;
