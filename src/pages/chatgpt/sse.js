/**
 * sse.js - A flexible EventSource polyfill/replacement.
 * https://github.com/mpetazzoni/sse.js
 *
 * Copyright (C) 2016-2024 Maxime Petazzoni <maxime.petazzoni@bulix.org>.
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @type SSE
 * @param {string} url
 * @param {SSEOptions} options
 * @return {SSE}
 */
var SSE = function (url, options) {
  if (!(this instanceof SSE)) {
    return new SSE(url, options)
  }

  /** @type {string} */
  this.url = url

  options = options || {}
  this.headers = options.headers || {}
  this.payload = options.payload !== undefined ? options.payload : ''
  this.method = options.method || (this.payload && 'POST') || 'GET'
  this.withCredentials = !!options.withCredentials
  this.debug = !!options.debug

  /** @type {boolean} */
  this.autoReconnect = options.autoReconnect !== undefined ? options.autoReconnect : false

  /** @type {number} */
  this.reconnectDelay = options.reconnectDelay !== undefined ? options.reconnectDelay : 3000

  /** @type {number|null} */
  this.maxRetries = options.maxRetries !== undefined ? options.maxRetries : null

  /** @type {number} */
  this.retryCount = 0

  /** @type {number|null} */
  this.reconnectTimer = null

  /** @type {boolean} */
  this.useLastEventId = options.useLastEventId !== undefined ? options.useLastEventId : true

  /** @type {string} */
  this.FIELD_SEPARATOR = ':'

  /** @type { {[key: string]: [EventListener]} } */
  this.listeners = {}

  /** @type {XMLHttpRequest} */
  this.xhr = null
  /** @type {number} */
  this.readyState = SSE.INITIALIZING
  /** @type {number} */
  this.progress = 0
  /** @type {string} */
  this.chunk = ''
  /** @type {string} */
  this.lastEventId = ''

  /**
   * @type AddEventListener
   */
  this.addEventListener = function (type, listener) {
    if (this.listeners[type] === undefined) {
      this.listeners[type] = []
    }

    if (this.listeners[type].indexOf(listener) === -1) {
      this.listeners[type].push(listener)
    }
  }

  /**
   * @type RemoveEventListener
   */
  this.removeEventListener = function (type, listener) {
    if (this.listeners[type] === undefined) {
      return
    }

    const filtered = []
    this.listeners[type].forEach(function (element) {
      if (element !== listener) {
        filtered.push(element)
      }
    })
    if (filtered.length === 0) {
      delete this.listeners[type]
    } else {
      this.listeners[type] = filtered
    }
  }

  /**
   * @type DispatchEvent
   */
  this.dispatchEvent = function (e) {
    if (!e) {
      return true
    }

    if (this.debug) {
      console.debug(e)
    }

    e.source = this

    const onHandler = 'on' + e.type
    if (this.hasOwnProperty(onHandler)) {
      this[onHandler].call(this, e)
      if (e.defaultPrevented) {
        return false
      }
    }

    if (this.listeners[e.type]) {
      return this.listeners[e.type].every(function (callback) {
        callback(e)
        return !e.defaultPrevented
      })
    }

    return true
  }

  /** @private */
  this._markClosed = function () {
    this.xhr = null
    this.progress = 0
    this.chunk = ''
    this._setReadyState(SSE.CLOSED)

    // If autoReconnect is enabled, attempt to reconnect after the delay
    if (this.autoReconnect) {
      // Check if we've hit the max retries
      if (this.maxRetries !== null && this.retryCount >= this.maxRetries) {
        if (this.debug) {
          console.debug(`SSE max retries (${this.maxRetries}) reached, stopping reconnection attempts`)
        }
        this.autoReconnect = false
        this.close() // Ensure connection is fully closed
        return
      }

      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer)
      }

      if (this.debug) {
        console.debug(
          `SSE will attempt to reconnect in ${this.reconnectDelay}ms (attempt ${
            this.retryCount + 1
          }${this.maxRetries ? '/' + this.maxRetries : ''})`
        )
      }

      this.reconnectTimer = setTimeout(() => {
        this.reconnectTimer = null
        this.retryCount++
        this.stream()
      }, this.reconnectDelay)
    }
  }

  /** @private */
  this._setReadyState = function (state) {
    const event = new CustomEvent('readystatechange')
    event.readyState = state
    this.readyState = state
    this.dispatchEvent(event)
  }

  this._onStreamFailure = function (e) {
    const event = new CustomEvent('error')
    event.responseCode = e.currentTarget.status
    event.data = e.currentTarget.response
    this.dispatchEvent(event)
    this._markClosed()
  }

  this._onStreamAbort = function () {
    this.dispatchEvent(new CustomEvent('abort'))
    this._markClosed()
  }

  /** @private */
  this._onStreamProgress = function (e) {
    if (!this.xhr) {
      return
    }

    if (this.xhr.status < 200 || this.xhr.status >= 300) {
      this._onStreamFailure(e)
      return
    }

    // Reset retry count on successful connection
    this.retryCount = 0

    const data = this.xhr.responseText.substring(this.progress)
    this.progress += data.length

    const parts = (this.chunk + data).split(/(\r\n\r\n|\r\r|\n\n)/g)

    /*
     * We assume that the last chunk can be incomplete because of buffering or other network effects,
     * so we always save the last part to merge it with the next incoming packet
     */
    const lastPart = parts.pop()
    parts.forEach(
      function (part) {
        if (part.trim().length > 0) {
          this.dispatchEvent(this._parseEventChunk(part))
        }
      }.bind(this)
    )
    this.chunk = lastPart
  }

  /** @private */
  this._onStreamLoaded = function (e) {
    this._onStreamProgress(e)

    // Parse the last chunk.
    this.dispatchEvent(this._parseEventChunk(this.chunk))
    this.chunk = ''

    this._markClosed()
  }

  /**
   * Parse a received SSE event chunk into a constructed event object.
   *
   * Reference: https://html.spec.whatwg.org/multipage/server-sent-events.html#dispatchMessage
   */
  this._parseEventChunk = function (chunk) {
    if (!chunk || chunk.length === 0) {
      return null
    }

    if (this.debug) {
      console.debug(chunk)
    }

    const e = { id: null, retry: null, data: null, event: null }
    chunk.split(/\n|\r\n|\r/).forEach(
      function (line) {
        const index = line.indexOf(this.FIELD_SEPARATOR)
        let field, value
        if (index > 0) {
          // only first whitespace should be trimmed
          const skip = line[index + 1] === ' ' ? 2 : 1
          field = line.substring(0, index)
          value = line.substring(index + skip)
        } else if (index < 0) {
          // Interpret the entire line as the field name, and use the empty string as the field value
          field = line
          value = ''
        } else {
          // A colon is the first character. This is a comment; ignore it.
          return
        }

        if (!(field in e)) {
          return
        }

        // consecutive 'data' is concatenated with newlines
        if (field === 'data' && e[field] !== null) {
          e['data'] += '\n' + value
        } else {
          e[field] = value
        }
      }.bind(this)
    )

    if (e.id !== null) {
      this.lastEventId = e.id
    }

    const event = new CustomEvent(e.event || 'message')
    event.id = e.id
    event.data = e.data || ''
    event.lastEventId = this.lastEventId
    return event
  }

  this._onReadyStateChange = function () {
    if (!this.xhr) {
      return
    }

    if (this.xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
      const headers = {}
      const headerPairs = this.xhr.getAllResponseHeaders().trim().split('\r\n')
      for (const headerPair of headerPairs) {
        const [key, ...valueParts] = headerPair.split(':')
        const value = valueParts.join(':').trim()
        // Ensure the header value is always an array
        headers[key.trim().toLowerCase()] = headers[key.trim().toLowerCase()] || []
        headers[key.trim().toLowerCase()].push(value)
      }

      const event = new CustomEvent('open')
      event.responseCode = this.xhr.status
      event.headers = headers
      this.dispatchEvent(event)
      this._setReadyState(SSE.OPEN)
    }
  }

  /**
   * starts the streaming
   * @type Stream
   * @return {void}
   */
  this.stream = function () {
    if (this.xhr) {
      // Already connected.
      return
    }

    this._setReadyState(SSE.CONNECTING)

    this.xhr = new XMLHttpRequest()
    this.xhr.addEventListener('progress', this._onStreamProgress.bind(this))
    this.xhr.addEventListener('load', this._onStreamLoaded.bind(this))
    this.xhr.addEventListener('readystatechange', this._onReadyStateChange.bind(this))
    this.xhr.addEventListener('error', this._onStreamFailure.bind(this))
    this.xhr.addEventListener('abort', this._onStreamAbort.bind(this))
    this.xhr.open(this.method, this.url)
    for (let header in this.headers) {
      this.xhr.setRequestHeader(header, this.headers[header])
    }
    if (this.useLastEventId && this.lastEventId.length > 0) {
      this.xhr.setRequestHeader('Last-Event-ID', this.lastEventId)
    }
    this.xhr.withCredentials = this.withCredentials
    this.xhr.send(this.payload)
  }

  /**
   * closes the stream
   * @type Close
   * @return {void}
   */
  this.close = function () {
    if (this.readyState === SSE.CLOSED) {
      return
    }

    // Clear any pending reconnect timer and disable auto-reconnect
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    // Disable auto-reconnect when explicitly closed
    this.autoReconnect = false

    this.xhr.abort()
  }

  if (options.start === undefined || options.start) {
    this.stream()
  }
}

/** @type {number} */
SSE.INITIALIZING = -1
/** @type {number} */
SSE.CONNECTING = 0
/** @type {number} */
SSE.OPEN = 1
/** @type {number} */
SSE.CLOSED = 2

// Export our SSE module for npm.js
if (typeof exports !== 'undefined') {
  exports.SSE = SSE
}

// Export as an ECMAScript module
export { SSE }

/**
 * @typedef { {[key: string]: string} } SSEHeaders
 */
/**
 * @typedef {Object} SSEOptions
 * @property {SSEHeaders} [headers] - headers
 * @property {string} [payload] - payload as a string
 * @property {string} [method] - HTTP Method
 * @property {boolean} [withCredentials] - flag, if credentials needed
 * @property {boolean} [start] - flag, if streaming should start automatically
 * @property {boolean} [debug] - debugging flag
 * @property {boolean} [autoReconnect] - flag, if connection should auto-reconnect on disconnect/error
 * @property {number} [reconnectDelay] - delay in ms before reconnecting
 * @property {number|null} [maxRetries] - maximum number of reconnect attempts
 * @property {boolean} [useLastEventId] - flag, if Last-Event-ID header should be sent
 */
/**
 * @typedef {Object} _SSEvent
 * @property {string} id
 * @property {string} data
 */
/**
 * @typedef {Object} _ReadyStateEvent
 * @property {number} readyState
 */
/**
 * @typedef {Event & _SSEvent} SSEvent
 */
/**
 * @typedef {SSEvent & _ReadyStateEvent} ReadyStateEvent
 */
/**
 * @callback AddEventListener
 * @param {string} type
 * @param {function} listener
 * @returns {void}
 */
/**
 * @callback RemoveEventListener
 * @param {string} type
 * @param {function} listener
 * @returns {void}
 */
/**
 * @callback DispatchEvent
 * @param {string} type
 * @param {function} listener
 * @returns {boolean}
 */
/**
 * @callback Stream
 * @returns {void}
 */
/**
 * @callback Close
 * @returns {void}
 */
/**
 * @callback OnMessage
 * @param {SSEvent} event
 * @returns {void}
 */
/**
 * @callback OnOpen
 * @param {SSEvent} event
 * @returns {void}
 */
/**
 * @callback OnLoad
 * @param {SSEvent} event
 * @returns {void}
 */
/**
 * @callback OnReadystatechange
 * @param {ReadyStateEvent} event
 * @returns {void}
 */
/**
 * @callback OnError
 * @param {SSEvent} event
 * @returns {void}
 */
/**
 * @callback OnAbort
 * @param {SSEvent} event
 * @returns {void}
 */
/**
 * @typedef {Object} SSE
 * @property {SSEHeaders} headers - headers
 * @property {string} payload - payload as a string
 * @property {string} method - HTTP Method
 * @property {boolean} withCredentials - flag, if credentials needed
 * @property {boolean} debug - debugging flag
 * @property {boolean} autoReconnect - flag, if connection should auto-reconnect
 * @property {number} reconnectDelay - delay in ms before reconnecting
 * @property {number|null} maxRetries - maximum number of reconnect attempts
 * @property {boolean} useLastEventId - flag, if Last-Event-ID header should be sent
 * @property {string} FIELD_SEPARATOR
 * @property {Record<string, Function[]>} listeners
 * @property {XMLHttpRequest | null} xhr
 * @property {number} readyState
 * @property {number} progress
 * @property {string} chunk
 * @property {-1} INITIALIZING
 * @property {0} CONNECTING
 * @property {1} OPEN
 * @property {2} CLOSED
 * @property {AddEventListener} addEventListener
 * @property {RemoveEventListener} removeEventListener
 * @property {DispatchEvent} dispatchEvent
 * @property {Stream} stream
 * @property {Close} close
 * @property {OnMessage} onmessage
 * @property {OnOpen} onopen
 * @property {OnLoad} onload
 * @property {OnReadystatechange} onreadystatechange
 * @property {OnError} onerror
 * @property {OnAbort} onabort
 */
