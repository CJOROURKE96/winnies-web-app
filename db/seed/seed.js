const db = require('../connection')
const format = require('pg-format')

const seed = ({winnieData, activityData}) => {
    return db
    .query(`DROP TABLE IF EXISTS winnie;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS activities;`)
    })
    .then(() => {
        return db.query(`CREATE TABLE winnie (
            winnie_id SERIAL PRIMARY KEY,
            name VARCHAR(200),
            location VARCHAR(200),
            image VARCHAR(500)
        );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE activities (
            activity_id SERIAL PRIMARY KEY,
            location VARCHAR(200),
            activity VARCHAR(200),
            image VARCHAR(500)
        );`)
    })
    .then(() => {
        const formattedWinnie = format(
            `INSERT INTO winnie (
                name, location, image)
                VALUES
                %L RETURNING *;`,
                winnieData.map(({name, location, image}) => [name, location, image])
        );
        return db.query(formattedWinnie)
    })
    .then(() => {
        const formattedActivities = format(
            `INSERT INTO activities (
                location, activity, image
            )
            VALUES
            %L RETURNING *;`,
            activityData.map(({location, activity, image}) => [location, activity, image])
        );
        return db.query(formattedActivities)
    })
}

module.exports = seed;

