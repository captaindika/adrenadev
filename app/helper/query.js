const db = require('../utils/connection')

const queryPromise = (sql, data) => {
  return new Promise((resolve, reject) => {
    const result = db.query(sql, data, (err, results, fields) => {
      if (err) {
        reject(Error(err))
      }
      resolve({ results, fields })
    })
    console.log(result.sql)
  })
}

module.exports = {
  queryPromise
}