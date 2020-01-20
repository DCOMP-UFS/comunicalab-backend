const User = use('App/Models/User');
const Permission = use('Adonis/Acl/Permission');
const Database = use('Database');
class PermissionController {
  async newPermission({ request, response }) {
    try {
      const nova = await new Permission();
      const data = await request.only(['slug', 'name', 'description']);
      nova.slug = data.slug;
      nova.name = data.name;
      nova.description = data.description;
      await nova.save();
      return nova;
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  async init({ response }) {
    try {
      const createUsersPermission = await new Permission();
      createUsersPermission.slug = 'create_users';
      createUsersPermission.name = 'Create Users';
      createUsersPermission.description = 'create users permission';
      await createUsersPermission.save();

      const updateUsersPermission = await new Permission();
      updateUsersPermission.slug = 'update_users';
      updateUsersPermission.name = 'Update Users';
      updateUsersPermission.description = 'update users permission';
      await updateUsersPermission.save();

      const deleteUsersPermission = await new Permission();
      deleteUsersPermission.slug = 'delete_users';
      deleteUsersPermission.name = 'Delete Users';
      deleteUsersPermission.description = 'delete users permission';
      await deleteUsersPermission.save();

      const readUsersPermission = await new Permission();
      readUsersPermission.slug = 'read_users';
      readUsersPermission.name = 'Read Users';
      readUsersPermission.description = 'read users permission';
      await readUsersPermission.save();
      return response.send('Created!');
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  async attachPermission({ request, params, response }) {
    try {
      const data = request.only(['permissionName']);
      const user = await User.findOrFail(params.id);

      const perm = await Database.raw(
        'select * from permissions where name = ?',
        [data.permissionName]
      );
      await user.permissions().attach([perm[0].id]);
      return await user.getPermissions();
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  async listPermission({ params }) {
    const user = await User.findOrFail(params.id);
    return user.getPermissions();
  }

  async detachPermission({ request, params, response }) {
    try {
      const data = request.only(['permissionName']);
      const user = await User.findOrFail(params.id);

      const perm = await Database.raw(
        'select * from permissions where name = ?',
        [data.permissionName]
      );
      await user.permissions().detach([perm[0].id]);
      return await user.getPermissions();
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
}

module.exports = PermissionController;
