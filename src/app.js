const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
var redis = require('redis')
var client = redis.createClient()
// client.auth('acfb45369dcada47412c0b5871d13158e48e097bb8bc6717227f526cf380de8b')
const app = express()

app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

app.post('/seed', (req, res) => {
  client.hmset(req.body.hash, {
    'ipfs': req.body.ipfs,
    'address': req.body.address,
    'timestamp': req.body.timestamp,
    'metaData': req.body.metaDataString,
    'name': req.body.name
  }, (err, littRedisPost) => {
    if (err) {
      console.log(err)
    } else {
      res.send(littRedisPost)
    }
  })
})

app.post('/getSeed', (req, res) => {
  client.hgetall(req.body.search, (err, littRedisGet) => {
    if (err) {
      console.log(err)
    } else {
      res.send(littRedisGet)
    }
  })
})

app.get('/status', (req, res) => {
  res.send({
    message: 'hello world'
  })
})

app.listen(8080)
