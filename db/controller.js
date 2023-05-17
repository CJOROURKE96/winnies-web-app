const { fetchWinnie, fetchActivities, addActivity } = require('./model');

function getWinnie(request, response, next) {
  fetchWinnie()
    .then((winnie) => {
      response.status(200).send(winnie);
    })
    .catch(next);
}

function getActivities(request, response, next) {
  fetchActivities(request.body)
    .then((activities) => {
      response.status(200).send(activities);
    })
    .catch(next);
}

function postNewActivity(request, response, next) {
  addActivity(request.body)
    .then((newActivity) => {
      response.status(201).send({ activity: newActivity[1] });
    })
    .catch(next);
}

module.exports = { getWinnie, getActivities, postNewActivity };
