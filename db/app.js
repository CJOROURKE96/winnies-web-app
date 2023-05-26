const express = require('express');
const cors = require('cors')

const { getWinnie, getActivities, postNewActivity, patchActivity } = require('./controller');

const app = express();

app.use(cors())
app.use(express.json());

app.get('/api/winnie', getWinnie);
app.get('/api/activities', getActivities)
app.post('/api/activities', postNewActivity)
app.patch('/api/activities/:activity_id', patchActivity)

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
