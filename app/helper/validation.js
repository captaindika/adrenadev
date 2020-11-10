const { ValidationError } = require('joi')
const joi = require('joi').extend(require('@hapi/joi-date'))

const validate = (input) => {
  const eventSchema = 
  joi.object().keys({
    title: joi.string().min(5).max(20).required(),
    description: joi.string().min(5).max(20).required(),
    start: joi.date().greater('now').required(),
    end: joi.date().greater(joi.ref('start')).required(),
    price: joi.number().positive().required()
  })

  const result  = eventSchema.validate(input)
  
  return result
  
}

const validateUpdate = (input) => {
  const updateSchema = 
  joi.object().keys({
    newTitle: joi.string().allow('').optional().min(5).max(20),
    newDescription: joi.string().allow('').optional().min(5).max(20),
    newStart: joi.date().allow('').optional().optional().greater('now'),
    newEnd: joi.date().allow('').optional().greater(joi.ref('start')),
    newPrice: joi.number().allow('').optional().positive()
  })

  const result  = updateSchema.validate(input)
  
  return result
}

module.exports = {
  validate,
  validateUpdate
}

