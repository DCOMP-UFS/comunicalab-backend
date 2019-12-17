const User = use('App/Models/User');
class UserController {
  /**
   * Show a list of all users.
   * GET user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const data = await User.query()
        .where('is_deleted', false)
        .fetch();

      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Create/save a new user.
   * POST user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only([
        'username',
        'email',
        'password',
        'affiliation_id',
      ]);

      data.is_deleted = false;

      const user = await User.create(data);

      return response.status(201).send(user);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Display a single user.
   * GET user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const user = await User.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .fetch();

      const userJSON = user.toJSON();

      if (Object.keys(userJSON).length === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      return response.status(200).send(userJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const data = request.post();

      const user = await User.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update(data);

      if (user === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const userUpdate = await User.findOrFail(params.id);

      return response.status(200).send(userUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const user = await User.query()
        .where('id', params.id)
        .where('is_deleted', false)
        .update({ is_deleted: true });

      if (user === 0) {
        return response.status(404).send({ message: 'Not Found' });
      }

      const userUpdate = await User.findOrFail(params.id);

      return response.status(200).send(userUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = UserController;
