/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Specification = use('App/Models/Specification');

/**
 * Resourceful controller for interacting with specifications
 */
class SpecificationController {
  /**
   * Show a list of all specifications.
   * GET specifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const data = await Specification.query()
        .where('is_deleted', false)
        .fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Create/save a new specification.
   * POST specifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['softCategory_id', 'eqipCategory_id']);

      data.is_deleted = false;

      const specification = await Specification.create(data);

      return response.status(201).send(specification);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single specification.
   * GET specifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const specification = await Specification.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .fetch();

      const specificationJSON = specification.toJSON();

      if (Object.keys(specificationJSON).length === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(specificationJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update specification details.
   * PUT or PATCH specifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const specification = await Specification.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (specification === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const specificationUpdate = await Specification.findOrFail(params.id);

      return response.status(200).send(specificationUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a specification with id.
   * DELETE specifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const specification = await Specification.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update({ is_deleted: true });

      if (specification === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const specificationUpdate = await Specification.findOrFail(params.id);

      return response.status(200).send(specificationUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = SpecificationController;
