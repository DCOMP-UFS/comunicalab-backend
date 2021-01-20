/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Location = use('App/Models/Location');
/**
 * Resourceful controller for interacting with location
 */
class LocationController {
  /**
   * Show a list of all locations.
   * GET locations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    try {
      const data = await Location.query().where('is_deleted', false).fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Create/save a new location.
   * POST locations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['building', 'floor']);
      data.is_deleted = false;

      const location = await Location.create(data);

      return response.status(201).send(location);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single location.
   * GET locations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const location = await Location.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .fetch();

      const locationJSON = location.toJSON();

      if (Object.keys(locationJSON).length === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(locationJSON);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update location details.
   * PUT or PATCH locations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const location = await Location.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (location === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const locationUpdate = await Location.findOrFail(params.id);

      return response.status(200).send(locationUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a location with id.
   * DELETE locations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const location = await Location.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update({ is_deleted: true });

      if (location === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const locationUpdate = await Location.findOrFail(params.id);

      return response.status(200).send(locationUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = LocationController;
