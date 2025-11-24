const helmet = require('helmet')

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

// ==== GitHub OAuth helper endpoints ====
const https = require('https')
const querystring = require('querystring')

function postToGitHubToken({ code, redirect_uri, client_id, client_secret }) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({ client_id, client_secret, code, redirect_uri })

    const options = {
      hostname: 'github.com',
      path: '/login/oauth/access_token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        Accept: 'application/json',
        'User-Agent': 'pro-react-admin-server'
      },
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          resolve(parsed)
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on('error', (e) => reject(e))
    req.write(postData)
    req.end()
  })
}

function getFromGitHubApi(path, accessToken) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'pro-react-admin-server',
      },
    }

    if (accessToken) {
      options.headers.Authorization = `token ${accessToken}`
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          resolve(parsed)
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on('error', (e) => reject(e))
    req.end()
  })
}

// Exchange code for access_token (server-side)
app.post('/api/github-token', async (req, res) => {
  try {
    const { code, redirect_uri } = req.body || {}
    if (!code) return res.status(400).json({ error: 'missing_code' })

    const client_id = process.env.GITHUB_CLIENT_ID || ''
    const client_secret = process.env.GITHUB_CLIENT_SECRET || ''
    if (!client_id || !client_secret) {
      return res.status(500).json({ error: 'server_misconfigured', message: 'GITHUB_CLIENT_ID/SECRET not set' })
    }

    const tokenData = await postToGitHubToken({ code, redirect_uri, client_id, client_secret })

    if (tokenData.error) {
      return res.status(400).json(tokenData)
    }

    return res.json(tokenData)
  } catch (err) {
    console.error('github-token error', err)
    return res.status(500).json({ error: 'exchange_failed' })
  }
})

// Get user info using access token
app.get('/api/github-user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || ''
    let token = ''
    if (authHeader.startsWith('token ')) token = authHeader.slice(6)
    if (!token && req.query && req.query.token) token = req.query.token
    if (!token) return res.status(400).json({ error: 'missing_token' })

    const user = await getFromGitHubApi('/user', token)
    return res.json(user)
  } catch (err) {
    console.error('github-user error', err)
    return res.status(500).json({ error: 'fetch_user_failed' })
  }
})

// Get user emails using access token
app.get('/api/github-email', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || ''
    let token = ''
    if (authHeader.startsWith('token ')) token = authHeader.slice(6)
    if (!token && req.query && req.query.token) token = req.query.token
    if (!token) return res.status(400).json({ error: 'missing_token' })

    const emails = await getFromGitHubApi('/user/emails', token)
    return res.json(emails)
  } catch (err) {
    console.error('github-email error', err)
    return res.status(500).json({ error: 'fetch_emails_failed' })
  }
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected!')
  })
  .catch((err) => {
    console.warn('MongoDB connection failed, continuing without DB:', err && err.message ? err.message : err)
  })
  .finally(() => {
    const port = process.env.PORT || 5200
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  })
