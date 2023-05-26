const {
  fetchWinnie,
  fetchActivities,
  addActivity,
  updateActivity,
} = require('./model');

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
      response.status(200).send(activities);
    })
    .catch(next);
}

function postNewActivity(request, response, next) {
  addActivity(request.body)
    .then((newActivity) => {
      response.status(201).send({ activity: newActivity });
    })
    .catch(next);
}

function patchActivity(request, response, next) {
  const { activity_id } = request.params;
  const { location, activity, image } = request.body;
  updateActivity(activity_id, location, activity, image)
    .then((updatedActivity) => {
      response.status(200).send({ activity: updatedActivity });
    })
    .catch(next);
}

module.exports = { getWinnie, getActivities, postNewActivity, patchActivity };
