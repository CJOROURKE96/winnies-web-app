const db = require('../connection')
const format = require('pg-format')

const seed = ({winnieData, activityData}) => {
    return db
    .query(`DROP TABLE IF EXISTS winnie CASCADE;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS activities CASCADE;`)
    })
    .then(() => {
        return db.query(`CREATE TABLE winnie (
            winnie_id SERIAL PRIMARY KEY,
            name VARCHAR(200),
            location VARCHAR(200),
            image VARCHAR(200)
        );`)
    })
    .then(() => {
        return db.query(`CREATE TABLE activities (
            activity_id SERIAL PRIMARY KEY,
            location VARCHAR(200),
            activity VARCHAR(200),
            image VARCHAR(200)
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
}

module.exports = seed;

