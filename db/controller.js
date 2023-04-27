const { fetchWinnie } = require('./model');

function getWinnie(request, response, next) {
  fetchWinnie()
    .then((winnie) => {
      response.status(200).send(winnie);
    })
    .catch(next);
}

module.exports = { getWinnie };
