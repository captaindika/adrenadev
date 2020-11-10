const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {getBy, upcoming, insert} = require('../model/user')
const {code, status} = require('../helper/status')
const tableUser = 'users'
const mysql = require('mysql')



const login = async (req, res) => {
  try {
    const {username, pass} = req.body
    const userData = await getBy({username}, tableUser)
    const {id, role_id, password} = userData[0]
    const checkPass = bcrypt.compareSync(pass, password)
    if (checkPass) {
      const payload = { id, username, role_id }
      const options = { expiresIn: '1d' }
      const key = process.env.APP_KEY
      const token = jwt.sign(payload, key, options)
      res.status(code.success).send(status(code.success, token))
    } else {
      res.status(code.success).send({status: false, message: 'wrong password'})
    }
  } catch(err) {
    res.status(code.success).send({success: false, message: 'username not found'})
  }
}

const nextEvent = async(req, res) => {
  try {
    const now = new Date()
    const date = [mysql.raw('>'), now]
    const result = await upcoming(date)
    res.status(code.success).send({success: true, data: result})
  }catch (err) {
    res.status(code.internalServerError).send(status(code.internalServerError))
  }
}

const pastEvent = async(req, res) => {
  try {
    const now = new Date()
    const date = [mysql.raw('<'), now]
    const result = await upcoming(date)
    res.status(code.success).send({success: true, data: result})
  } catch (err) {
    res.status(code.internalServerError).send(status(code.internalServerError))
  }
}

const eventDetail = async(req, res) => {
  try {
    const {id} = req.params

    const result = await getBy({id},'events')
    res.status(code.success).send(status(code.success, result[0]))
  } catch(err) {
    res.status(code.internalServerError).send(status(code.internalServerError))
  }
}

const registerEvent = async(req, res) => {
  try {
    const {id} = req.user
    const {idEvent} = req.body
    const data = {
      id_user: id,
      id_event: parseInt(idEvent),
      status: 'lunas'
    }
    const result = await insert(data, 'booking')
    if (result === 1) {
      res.status(code.success).send(status(code.success, data, `successfull`))
    }
  } catch (err) {
    res.status(code.internalServerError).send(status(code.internalServerError))
  }
}

module.exports = {
  login,
  nextEvent,
  pastEvent,
  eventDetail,
  registerEvent
}