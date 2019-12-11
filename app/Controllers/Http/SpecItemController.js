/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const SpecItem = use('App/Models/SpecItem');

/**
 * Resourceful controller for interacting with specitems
 */
class SpecItemController {
  async index({ request, params, response }) {
    try {
      // const page = params.page;
      // const page = request.only(["page"]);
      const data = await SpecItem.query()
        .where('is_deleted', false)
        .fetch();
      // .paginate(page.page, 10)
      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  async store({ request, response }) {
    try {
      const data = request.only(['name', 'value', 'specification_id']);
      data.is_deleted = false;
      const specItem = await SpecItem.create(data);

      return response.status(201).send(specItem);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  async show({ params, request, response, view }) {
    try {
      const specItem = await SpecItem.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .fetch();

      const specItemJSON = specItem.toJSON();

      if (Object.keys(specItemJSON).length === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(specItemJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.post();

      const specItem = await SpecItem.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (specItem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const specItemUpdate = await SpecItem.findOrFail(params.id);

      return response.status(200).send(specItemUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const specItem = await SpecItem.query()
        .where('id', params.id)
        .update({ is_deleted: true });

      if (specItem === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const specItemDeleted = await SpecItem.findOrFail(params.id);

      return response.status(200).send(specItemDeleted);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = SpecItemController;
