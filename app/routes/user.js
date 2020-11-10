const user = require('express').Router()
const {nextEvent, pastEvent, eventDetail, registerEvent} = require('../controller/user')
const {checkToken} = require('../middleware/authorization')


user.get('/upcoming-event', nextEvent)
user.get('/past-event', pastEvent)
user.get('/event/:id', eventDetail)
user.post('/register-event', checkToken, registerEvent)



module.exports = user