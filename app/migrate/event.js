const db = require('../utils/connection')

const query = `create table IF NOT EXISTS events (
  id int AUTO_INCREMENT PRIMARY KEY,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  event_start DATETIME NOT NULL,
  event_end DATETIME NOT NULL,
  price decimal(9,2) NOT NULL,
  created_by int NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) )`

  db.query(query)
