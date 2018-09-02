const MongoClient = require('mongodb').MongoClient

const ObjectID = require('mongodb').ObjectID
const express = require('express')
const cors = require('cors')

// TODO move to .env config
const dbUrl = 'mongodb://localhost:27017'
const dbName = 'festivalmanager'

const app = express()
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())       // to support JSON-encoded bodies default
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.use(express.static('public'))

MongoClient.connect(dbUrl, function (err, client) {

  const db = client.db(dbName)

  app.post('/layers/import', (req, res) => {
    req.body.layers.map(layer => {
      db.collection('layers').insert({data: layer.data})
    })
  })

  app.get('/layers', (req, res) => {
    console.log('Fetching layers')
    db.collection('layers').find().toArray().then(layers => res.json(layers))
  })

  app.post('/layer', (req, res) => {
    db.collection('layers').insert({data: req.body})
    res.json(req.body)
  })

  app.put('/layer', (req, res) => {
    console.log('Updating Layer')
    db.collection('layers').update({_id: new ObjectID(req.body._id)},
        {
          $set: {
            'data.layerName': req.body.name,
            'data.type': req.body.type,
            'data.section': req.body.section
          }
        }
    ).then(response => {
      res.json(response)
    }).catch(error => res.status(503).json(error))
  })


  app.delete('/layer/:layerId', (req, res) => {
    console.log('Going to rmeove', req.params.layerId)
    db.collection('layers').remove(
        {_id: new ObjectID(req.params.layerId)}
    )
        .then(result => res.json(result))
        .catch(error => res.status(503).json(error))
  })
})

app.listen(6969, () => console.log('Listening on port 6969'))
