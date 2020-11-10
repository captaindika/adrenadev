const db = require('../utils/connection')
require('dotenv').config()
var bcryptjs = require('bcryptjs')

const username = 'mamang_kesbor'
var salt = bcryptjs.genSaltSync(10)
var adminPass = bcryptjs.hashSync(process.env.PASS_ADMIN, salt)
var userPass = bcryptjs.hashSync(process.env.PASS_USER, salt)
var user2Pass = bcryptjs.hashSync('user2', salt)

const create = `CREATE TABLE IF NOT EXISTS users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id TINYINT(2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP)`

const insert = `INSERT INTO users(username, password, role_id) VALUES  ?`
const values = [[`${username}`, `${adminPass}`, 1],['mamat_manja', `${userPass}`, 2], ['user2', `${user2Pass}`, 2]]
db.query(create, () => {
  db.query(insert,[values])
})