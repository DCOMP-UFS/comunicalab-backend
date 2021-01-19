'use strict'

class EquipHistory {
  get validateAll() {
    return true
  }
  
  get rules () {
    return {
      equipment_id: 'exists:equipments,id',
      usage_status: 'required',
      problem_status: 'required'
    }
  }

  get data() {
    const requestBody = this.ctx.request.all()
    const equipment_id = this.ctx.params.equipment_id

    return Object.assign({}, requestBody, { equipment_id })
  }

  get messages() {
    return {
      'equipment_id.exists': 'Invalid equipment id',
      'usage_status.required': 'You must provide the usage status',
      'problem_status.required': 'You must provide the problem status'
    }
  }
}

module.exports = EquipHistory
