/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Location = use('App/Models/Location');

class LocationController {
  async index({ response }) {
    try {
      const data = await Location.query().where('is_deleted', false).fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

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
