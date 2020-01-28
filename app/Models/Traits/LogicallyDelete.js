class LogicallyDelete {
  register(Model, customOptions = {}) {
    const defaultOptions = { field: 'is_deleted' };
    const options = Object.assign(defaultOptions, customOptions);

    Model.query2 = Model.query;
    Model.delete2 = Model.delete;
    Model.query = () => {
      const query = Model.query2().where(options.field, false);
      query.delete = async () => {
        const updateDict = {};
        updateDict[options.field] = true;
        return query.update(updateDict);
      };
      return query;
    };
  }
}

module.exports = LogicallyDelete;
