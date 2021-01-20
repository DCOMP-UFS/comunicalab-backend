'use strict'

const Equipment = use("App/Models/Equipment")
const EquipHistory = use('App/Models/EquipmentHistory')

class EquipmentHistoryController {
  async index({ response, params }) {
    try {
      const equipId = Number(params.equipment_id)

      if (!await Equipment.find(equipId))
        return response.notFound("No equipment with this id")
    
      const history = await EquipHistory.query()
        .where('is_deleted', false)
        .where('equipment_id', equipId)
        .fetch()

      return response.status(200).json({ history })
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error.message })

      return response.status(500).send({ message: error.message })
    }
  }

  async show({ response, params }) {
    try {
      const id = Number(params.id)
      const equipmentId = Number(params.equipment_id)

      const historyRecord = await EquipHistory.query()
        .where('is_deleted', false)
        .where('equipment_id', equipmentId)
        .where('id', id)
        .first()

      if (!historyRecord)
        return response.notFound('Not Found')

      return response.status(200).send({ historyRecord })
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error.message })

      return response.status(500).send({ message: error.message })
    }
  }

  async store({ request, response, params, auth }) {
    try {
      const data = request.only(['usage_status', 'problem_status'])

      const historyRecord = await EquipHistory.create({
        ...data,
        equipment_id: Number(params.equipment_id),
        user_id: auth.user.id,
        tracked_at: Date.now(),
        is_deleted: false
      })

      return response.status(201).json({ historyRecord })
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error.message })

      return response.status(500).send({ message: error.message })
    }
  }

  async update({ request, response, params }) {
    try {
      const data = request.only(['usage_status', 'problem_status'])
      const id = Number(params.id)
      const equipmentId = Number(params.equipment_id)

      let historyRecord = await EquipHistory.query()
        .where('is_deleted', false)
        .where('equipment_id', equipmentId)
        .where('id', id)
        .update(data)

      if (historyRecord === 0)
        return response.notFound('Not Found')

      historyRecord = await EquipHistory.findOrFail(id)

      return response.status(200).send({ historyRecord })
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error.message })

      return response.status(500).send({ message: error.message })
    }
  }

  async destroy({ response, params }) {
    try {
      const id = Number(params.id)
      const equipmentId = Number(params.equipment_id)

      let historyRecord = await EquipHistory.query()
        .where('is_deleted', false)
        .where('equipment_id', equipmentId)
        .where('id', id)
        .update({ is_deleted: true })

      if (historyRecord === 0)
        return response.notFound('Not Found')

      historyRecord = await EquipHistory.findOrFail(id)

      return response.status(204).send({ historyRecord })
    } catch (error) {
      if (error.status)
        return response.status(error.status).send({ message: error.message })

      return response.status(500).send({ message: error.message })
    }
  }
}

module.exports = EquipmentHistoryController
