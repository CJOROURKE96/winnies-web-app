const request = require('supertest');
const seed = require('../db/seed/seed');
const app = require('../db/app');
const db = require('../db/connection');
const winnieData = require('../db/data/test_data/winnie');
const activityData = require('../db/data/test_data/activity');

beforeEach(() => {
  return seed({ winnieData, activityData });
});

afterAll(() => {
  db.end();
});

describe('APP', () => {
  describe('GET /api/winnie', () => {
    test('should return an array of information about Winnie, with the status code 200', () => {
      return request(app)
        .get('/api/winnie')
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(2);
          body.forEach((winnie) => {
            expect(winnie).toHaveProperty('name', expect.any(String));
            expect(winnie).toHaveProperty('location', expect.any(String));
            expect(winnie).toHaveProperty('image', expect.any(String));
          });
        });
    });
    test('should return a 404 error when accessing the wrong URL', () => {
      return request(app).get('/api/winnie/abcd').expect(404);
    });
  });

  describe('GET /api/activities', () => {
    test('should return an array of activities, with the status code 200', () => {
      return request(app)
        .get('/api/activities')
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(2);
          body.forEach((activity) => {
            expect(activity).toHaveProperty('location', expect.any(String));
            expect(activity).toHaveProperty('activity', expect.any(String));
            expect(activity).toHaveProperty('image', expect.any(String));
          });
        });
    });
    test('should return a 404 error when accessing the wrong URL:', () => {
      return request(app).get('/api/activities/abcd').expect(404);
    });
  });

  describe('POST /api/activities', () => {
    test('should return a new activity with passed location, activity, image and a status code of 201.', () => {
      const input = {
        location: 'Preston',
        activity: 'Playing in the dog park',
        image: 'https://i.imgur.com/9QJr1jh.png',
      };
      return request(app)
        .post('/api/activities')
        .send(input)
        .expect(201)
        .then(({ body }) => {
          expect(body.activity.location).toBe('Preston');
          expect(body.activity.activity).toBe('Playing in the dog park');
          expect(body.activity.image).toBe('https://i.imgur.com/9QJr1jh.png');
        });
    });
    test('should return a 404 error when attempting to post to the wrong URL', () => {
      return request(app).post('/api/activities/abcd').expect(404);
    });
  });
  describe('PATCH /api/activities/:activity_id', () => {
    test('should update only the location section', () => {
      const newLocation = {
        location: 'Home',
      };
      return request(app)
        .patch('/api/activities/1')
        .send(newLocation)
        .expect(200)
        .then(({ body }) => {
          expect(body.activity.location).toBe('Home');
        });
    });
    test('should update only the activity section', () => {
      const newActivity = {
        activity: 'Sleeping',
      };
      return request(app)
        .patch('/api/activities/1')
        .send(newActivity)
        .expect(200)
        .then(({ body }) => {
          expect(body.activity.activity).toBe('Sleeping');
        });
    });
    test('should update only the image section', () => {
      const newImage = {
        image: "test image"
      }
      return request(app)
      .patch('/api/activities/1')
      .send(newImage)
      .expect(200)
      .then(({body}) => {
        expect(body.activity.image).toBe("test image")
      })
    });
  });
});
