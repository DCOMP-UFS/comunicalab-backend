/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const EquipCategory = use('App/Models/EquipCategory');
/**
 * Resourceful controller for interacting with equipcategories
 */
class EquipCategoryController {
  /**
   * Show a list of all equipcategories.
   * GET equipcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const data = await EquipCategory.query()
        .where('is_deleted', false)
        .fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Create/save a new equipcategory.
   * POST equipcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['name']);

      data.is_deleted = false;
      const equipCategory = await EquipCategory.create(data);

      return response.status(201).send(equipCategory);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single equipcategory.
   * GET equipcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const equipCategory = await EquipCategory.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .fetch();

      const equipCategoryJSON = equipCategory.toJSON();

      if (Object.keys(equipCategoryJSON).length === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(equipCategoryJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update equipcategory details.
   * PUT or PATCH equipcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const equipCategory = await EquipCategory.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (equipCategory === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const equipCategoryUpdate = await EquipCategory.findOrFail(params.id);

      return response.status(200).send(equipCategoryUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a equipcategory with id.
   * DELETE equipcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const equipCategory = await EquipCategory.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update({ is_deleted: true });

      if (equipCategory === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const equipCategoryUpdate = await EquipCategory.findOrFail(params.id);

      return response.status(200).send(equipCategoryUpdate);
    } catch (error) {
      return response.status(error.stfatus).send({ message: error });
    }
  }
}

module.exports = EquipCategoryController;
