const admin = require('express').Router()
const {addEvent, allEvent, deleteEvent, updateEvent, viewUser} = require('../controller/admin')
const {checkToken, checkRole} = require('../middleware/authorization')


admin.post('/create-event', checkToken, checkRole, addEvent)
admin.get('/event', checkToken, checkRole, allEvent)
admin.get('/event/:idEvent/user', checkToken, checkRole, viewUser)
admin.delete('/event/:id',checkToken,checkRole, deleteEvent)
admin.put('/event/:id', checkToken, checkRole, updateEvent)



module.exports = admin