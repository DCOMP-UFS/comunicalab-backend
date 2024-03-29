/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Laboratory = use('App/Models/Laboratory');

/**
 * Resourceful controller for interacting with laboratories
 */
class LaboratoryController {
  /**
   * Show a list of all laboratories.
   * GET laboratories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, params, response }) {
    try {
      // const page = params.page;
      // const page = request.only(["page"]);
      const data = await Laboratory.query()
        .where('is_deleted', false)
        .fetch();
      // .paginate(page.page, 10)
      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Create/save a new laboratory.
   * POST laboratories
   */
  async store({ request, response }) {
    try {
      const data = request.only([
        'name',
        'capacity',
        'is_in_use',
        'occupied_at',
        'location_id',
      ]);
      data.is_deleted = false;
      const lab = await Laboratory.create(data);

      return response.status(201).send(lab);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single laboratory.
   * GET laboratories/:id
   */
  async show({ params, request, response, view }) {
    try {
      const lab = await Laboratory.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .fetch();

      const labJSON = lab.toJSON();

      if (Object.keys(labJSON).length === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(labJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update laboratory details.
   * PUT or PATCH laboratories/:id
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const lab = await Laboratory.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (lab === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const labUpdate = await Laboratory.findOrFail(params.id);

      return response.status(200).send(labUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a laboratory with id.
   * DELETE laboratories/:id
   */
  async destroy({ params, request, response }) {
    try {
      const lab = await Laboratory.query()
        .where('id', params.id)
        .update({ is_deleted: true });

      if (lab === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const labDeleted = await Laboratory.findOrFail(params.id);

      return response.status(200).send(labDeleted);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = LaboratoryController;
