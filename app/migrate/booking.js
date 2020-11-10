const db = require('../utils/connection')

const query = `create table IF NOT EXISTS booking (
  id int AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  id_event INT NOT NULL,
  status VARCHAR(30) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_iduser FOREIGN KEY (id_user) REFERENCES users(id),
  CONSTRAINT fk_idevent FOREIGN KEY (id_event) REFERENCES events(id))
  `

  db.query(query)