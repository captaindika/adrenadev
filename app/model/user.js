const {queryPromise} = require('../helper/query')

const getBy = async (data, table) => {
  const sql = `SELECT * FROM ${table} WHERE ? `
  const query = await queryPromise(sql, data)
  return query.results
}

const insert = async (data, table) => {
  const sql =  `INSERT INTO ${table} SET ?`
  const query = await queryPromise(sql, data)
  return query.results.affectedRows
}

const getAll = async(table) => {
  const sql = `SELECT * FROM ${table}`
  const query = await queryPromise(sql)
  return query.results
}

const upcoming = async(date) => {
  const sql = `SELECT title, price FROM EVENTS WHERE event_start ? ?`
  const query = await queryPromise(sql, date)
  return query.results
}

const deleteBy = async(data, table) => {
  const sql = `DELETE FROM ${table} WHERE ?`
  const query = await queryPromise(sql,data)
  return query.results.affectedRows
}

const updateBy = async(data, table) => {
  const sql = `UPDATE ${table} SET ? WHERE ?`
  const query = await queryPromise(sql, data)
  return query.results.affectedRows
}

const viewRegisteredUser = async(data, table) => {
  const sql = `SELECT u.username FROM ${table} INNER JOIN users u  ON id_user = u.id WHERE ?`
  const query = await queryPromise(sql, data)
  return query.results
}
module.exports = {
  getBy,
  insert,
  getAll,
  upcoming,
  deleteBy,
  updateBy,
  viewRegisteredUser
}