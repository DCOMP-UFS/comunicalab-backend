'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const SpecificationItem = use("App/Models/SpecificationItem");

/**
 * Resourceful controller for interacting with specificationitems
 */
class SpecificationItemController {

  async index ({request, params, response}) {
    try {
      //const page = params.page;
      //const page = request.only(["page"]);
      const data = await SpecificationItem.query()
          .where("isDeleted", false)
          .fetch();
          //.paginate(page.page, 10)
        ;
       
      return response.status(200).send(data);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }
  
  async store ({ request, response }) {
    try {
      const data = request.only(["name", "value","specification_id"]);
      data.isDeleted = false;
      const specItem = await SpecificationItem.create(data);

      return response.status(201).send(specItem);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }


  async show ({ params, request, response, view }) {
    try {
      const specItem = await SpecificationItem.query()
        .where("id", params.id)
        .where("isDeleted", false)
        .fetch();

      const specItemJSON = specItem.toJSON();

      if (Object.keys(specItemJSON).length === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      return response.status(200).send(specItemJSON[0]);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.post();

      const specItem = await SpecificationItem.query()
        .where("id", params.id)
        .where("isDeleted", false)
        .update(data);

      if (specItem === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      const specItemUpdate = await SpecificationItem.findOrFail(params.id);

      return response.status(200).send(specItemUpdate);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }
  }

   async destroy ({ params, request, response }) {
    try {
      const specItem = await SpecificationItem.query()
        .where("id", params.id)
        .update({isDeleted: true});

      if (specItem === 0) {
        return response.status(404).send({ message: "Not Found" });
      }

      const specItemDeleted = await SpecificationItem.findOrFail(params.id);

      return response.status(200).send(specItemDeleted);
    } catch (error) {
      return response.status(error.status).send({ message: error });
    }

  }
}

module.exports = SpecificationItemController
