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
  });
});
