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
            .then(({body}) => {
                expect(body.length).toBe(2)
                body.forEach((winnie) => {
                    expect(winnie).toHaveProperty("name", expect.any(String))
                    expect(winnie).toHaveProperty("location", expect.any(String))
                    expect(winnie).toHaveProperty("image", expect.any(String))
                })
            })
        });
    });
});