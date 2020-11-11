const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {login} = require('./app/controller/user')
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

const userRoute = require('./app/routes/user')
const adminRoute = require('./app/routes/admin')

app.post('/login', login)
app.use('/admin', adminRoute)
app.use('/user', userRoute)
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

app.get('/migrate', (req,res) => {
  try {
    require('./app/migrate/user')
    require('./app/migrate/event')
    require('./app/migrate/booking')
    res.send('database created')
  } catch(err) {
    res.send(err)
  }
})



