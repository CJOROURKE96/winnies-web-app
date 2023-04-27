const express = require('express');

const { getWinnie } = require('./controller');

const app = express();

app.use(express.json());

app.get('/api/winnie', getWinnie);

app.use((err, request, response, next) => {
  if (err.status) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  if (err.code === '22P02') {
    response.status(400).send({ msg: 'Bad Request' });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({ msg: 'Internal Server Error' });
});

module.exports = app;
