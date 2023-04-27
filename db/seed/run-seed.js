const devData = require('../data/dev_data/index');
const seed = require('./seed');
const db = require('../connection');

const runSeed = () => {
  return seed(devData).then(() => {
    db.end();
  });
};

runSeed();
