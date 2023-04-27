const { fetchWinnie, fetchActivities } = require('./model');

function getWinnie(request, response, next) {
  fetchWinnie()
    .then((winnie) => {
      response.status(200).send(winnie);
    })
    .catch(next);
}

function getActivities(request, response, next) {
    fetchActivities()
    .then((activities) => {
        response.status(200).send(activities)
    })
    .catch(next)
}

module.exports = { getWinnie, getActivities };
