const axios = require('axios')
const express = require('express')
const osmtogeojson = require('osmtogeojson')

const app = express()

app.get('/data-by-bbox', async (req, res) => {
  try {
    const bbox = req.query.bbox
    if (bbox == null) {
      return res.sendStatus(400)
    }

    const { data } = await axios({
      method: 'get',
      url: `${process.env.OPEN_API_API_URL}api/0.6/map.json`,
      params: { bbox },
      responseType: 'json',
    })
    return res.json(osmtogeojson(data))
  } catch (error) {
    return res.sendStatus(500)
  }
})

module.exports = app
