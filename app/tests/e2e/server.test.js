const request = require('supertest')
const app = require('../../server')
const { mapsOsmResponse, mapsGeoJsonResponse } = require('../fixtures/common')
const nock = require('nock')

const BASE_URL = process.env.OPEN_API_API_URL

describe('Main router', () => {
  test('Request GET /data-by-bbox should return 200', async () => {
    nock(BASE_URL)
      .get('/api/0.6/map.json')
      .query(true)
      .reply(200, mapsOsmResponse)

    const result = await request(app).get('/data-by-bbox?bbox=12,21,12,21').send()

    expect(result.status).toBe(200)
    expect(result.body).toStrictEqual(mapsGeoJsonResponse)
  })

  test('Request GET /data-by-bbox should return 400 if bbox was not provided', async () => {
    const result = await request(app).get('/data-by-bbox').send()
    expect(result.status).toBe(400)
  })

  test('Request GET /data-by-bbox should handle source errors', async () => {
    nock(BASE_URL)
      .get('/api/0.6/map.json')
      .query(true)
      .reply(500)

    const result = await request(app).get('/data-by-bbox?bbox=12,21,12,21').send()

    expect(result.status).toBe(500)
  })
})
