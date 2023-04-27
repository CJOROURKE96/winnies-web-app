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

function addActivity(data) {
  const newActivity = [data.location, data.activity, data.image];
  return db
    .query(
      `INSERT INTO activities (
    location, activity, image
  )
  VALUES ($1, $2, $3) RETURNING *;`,
      newActivity
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = { fetchWinnie, fetchActivities, addActivity };
