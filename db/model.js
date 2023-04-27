const db = require('./connection');

function fetchWinnie() {
  return db.query(`SELECT * FROM winnie`).then(({ rows }) => {
    if (!rows) {
      return Promise.reject({ status: 400, msg: 'Invalid Query Input' });
    } else {
      return rows;
    }
  });
}

function fetchActivities() {
  return db.query(`SELECT * FROM activities`).then(({ rows }) => {
    if (!rows) {
      return Promise.reject({ status: 400, msg: 'Invalid Query Input' });
    } else {
      return rows;
    }
  });
}

module.exports = { fetchWinnie, fetchActivities };
