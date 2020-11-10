const {insert, getAll, deleteBy, updateBy, getBy, viewRegisteredUser} = require('../model/user')
const {isEmptyArray} = require('../helper/validator')
const {code, status} = require('../helper/status')
const {validate, validateUpdate} = require('../helper/validation')
const moment = require('moment')
const redis = require('redis')
const redisClient = redis.createClient()
redisClient.on('error', (err) => {
  console.log(err);
});

const addEvent = async(req, res) => {
  try {
    const {id} = req.user
    const {title, description, start, end, price} = req.body
    const {error} = validate(req.body)
    if (error) {
      return res.send(error.details[0].message)
    }
    const newStart = moment(start).utc('+07:00').format('YYYY-MM-DD HH:mm:ss')
    const newEnd = moment(end).utc('+07:00').format('YYYY-MM-DD HH:mm:ss')
      const data = {
        title,
        description,
        event_start: newStart,
        event_end: newEnd,
        price,
        created_by:id
      }
      await insert(data, 'events')
      res.status(code.success).send({success: true, data})
    
  }catch (err) {
    console.log(err)
    res.send(code.internalServerError).send(status(code.internalServerError))
  }

}

const allEvent = async(req, res) => {
  try {
    const result = await getAll('events')
    redisClient.get('event', (err, data) => {
      if (err) throw err;
      if (data !== null) {
        res.status(code.success).send(status(code.success, JSON.parse(data)))
      } else {
        res.status(code.success).send(status(code.success, result))
      }
    })
    redisClient.setex('event', 10, JSON.stringify(result))
  } catch (err) {
    console.log(err)
    res.send(code.internalServerError).send(status(code.internalServerError))
  }
}

const deleteEvent = async(req, res) => {
  try {
    const {id} = req.params
    const data = {id: parseInt(id)}
    const result = await deleteBy(data, 'events')
    if (result === 0) {
      res.status(code.notFound).send(status(code.notFound))
    } else {
      res.status(code.success).send(status(201, [] , `${id} was deleted`))
    }
  } catch (err) {
    res.status(code.internalServerError).send(status(code.internalServerError))
  }
}

const updateEvent = async(req, res) => {
  try {
    let {id} = req.params
    id = parseInt(id)
    let {newTitle, newDescription, newStart, newEnd, newPrice} = req.body
    const {error} = validateUpdate(req.body)
    console.log(error)
    if (error) {
      return res.send(error.details[0].message)
    }
    const pastData = await getBy({id}, 'events')
    if (pastData.length < 1) {
      res.status(code.success).send({success: false, message: `event with id ${id} not found`})
    }
    const {title, description, event_start, event_end, price} = pastData[0]
    const newData = {
      title: newTitle || title,
      description : newDescription || description,
      event_start : moment(newStart).utc('+07:00').format('YYYY-MM-DD HH:mm:ss') || event_start,
      event_end : moment(newEnd).utc('+07:00').format('YYYY-MM-DD HH:mm:ss') || event_end,
      price : parseInt(newPrice) || price
    }
    
    const result = await updateBy([newData, {id}], 'events')
    if (result !== 1) {
      res.status(code.internalServerError).send(status(code.internalServerError))
    }
    res.status(code.success).send(status(code.success, newData))
  } catch (err) {
    console.log(err)
    res.status(code.internalServerError).send(status(code.internalServerError))
  }
}

const viewUser = async(req, res) => {
  try {
    let {idEvent} = req.params
    const checkEvent = await getBy({id: parseInt(idEvent)}, 'events')
    if (checkEvent.length < 1) {
      return res.status(code.success).send({success: false, message: `event with id ${idEvent} not found`})
    }
    const result = await viewRegisteredUser({id_event: parseInt(idEvent)}, 'booking')
    if (result.length === 0) {
      res.status(code.success).send({success: true, data: []})
    } else {
      res.status(code.success).send(status(code.success, result))
    }
  } catch (err) {
    res.status(code.internalServerError).send(status(code.internalServerError))
  }
}


module.exports = {
  addEvent,
  allEvent,
  deleteEvent,
  updateEvent,
  viewUser
}