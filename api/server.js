import helmet from 'helmet'

const MONGODB = 'mongodb://127.0.0.1:27017/promotion?retryWrites=true'

const express = require('express')

const app = express()
app.use(helmet())

const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose')

const { Schema } = mongoose

const ApiSchema = new Schema({
  url: { type: String },
  delay: { type: Number },
  date: { type: Date, default: Date.now },
})

const ApiModel = mongoose.model('apis', ApiSchema)

app.post('/apis', (req, res) => {
  const newItem = new ApiModel(req.body)
  newItem.save()
  res.status(200).json({ ok: true })
})

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('MongoDB Connected!')
  app.listen({ port: 5200 }, () => {
    console.log('Server started on port 5200')
  })
})
