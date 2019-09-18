'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Laboratory = use("App/Models/Laboratory");

/**
 * Resourceful controller for interacting with laboratories
 */
class LaboratoryController {
  /**
   * Show a list of all laboratories.
   * GET laboratories
   **/
   async indexAll ({response }) {
     try{
       const laboratories =  await Laboratory.all(); 
       return response.status(200).send(laboratories);
     }catch{
       return response.status(error.status).send({message: error});
    }
   }

   async indexIsDelete({response}){
    try{
      const laboratories =  await Laboratory.query().where('isDelete', true).fetch();
      return response.status(200).send(laboratories);
    }catch{
      return response.status(error.status).send({message: error});
    }
  }

  async index ({response }) {
      try{
        const laboratories =  await Laboratory.query().where('isDelete', false).fetch();
        return response.status(200).send(laboratories);
      }catch{
        return response.status(error.status).send({message: error});
      }
  
  }
  /**
   * Create/save a new laboratory.
   * POST laboratories
   */
  async store ({ request, response }) {
    try{
      const data = request.only(["name", "location", "latitude", "longitude", "capacity", "status"]);
      data.isDelete = false;
      const laboratory = await Laboratory.create(data);
      return response.status(200).send(laboratory);
    }catch{
      return response.status(error.status).send({message: error});
    }  
  }

  /**
   * Display a single laboratory.
   * GET laboratories/:id
   */
  async show ({ params, response }) {
    try{
      const laboratory = await Laboratory.findOrFail(params.id);
      return response.status(200).send(laboratory);
    }catch{
      return response.status(error.status).send({message: error});
    }
  }

  /**
   * Update laboratory details.
   * PUT or PATCH laboratories/:id
   */
  async update ({ params, request, response }) {
    try{
      const laboratory = await Laboratory.findOrFail(params.id);
      const data = request.only(["name", "location", "latitude", "longitude", "capacity", "status"]);
      laboratory.merge(data);
      await laboratory.save();
      return response.status(200).send(laboratory);
    }catch{
      return response.status(error.status).send({message:error});
    }

  }

  /**
   * Delete a laboratory with id.
   * DELETE laboratories/:id
   */
  async destroy ({ params, request, response }) {
    try{
      const laboratory = await Laboratory.findOrFail(params.id);
      const data = request.only(["isDelete"]);
      laboratory.merge(data)
      await laboratory.save();
      return response.status(200).send({message:'Deleted lab'})
    }catch{
      return response.status(error.status).send({message:error});
    }
  }
}

module.exports = LaboratoryController
