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

function updateActivity(activity_id, location, activity, image) {
  const query = `UPDATE activities SET location = COALESCE($1, location), activity = COALESCE($2, activity), image = COALESCE($3, image) WHERE activity_id = $4 RETURNING *;`;
  return db
    .query(query, [location, activity, image, activity_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 400, msg: 'Not Found' });
      } else return rows[0];
    });
}

module.exports = { fetchWinnie, fetchActivities, addActivity, updateActivity };
