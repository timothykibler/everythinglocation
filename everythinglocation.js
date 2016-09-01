'use strict'
const request = require('request')

class EverythingLocation {
  constructor(apikey, endpoint) {
    this.key = apikey
    this.endpoint = endpoint
  }

  get key() {
    return this._key
  }

  set key(apikey) {
    this._key = apikey
  }

  get endpoint() {
    return this._endpoint
  }

  set endpoint(endpoint) {
    this._endpoint = endpoint || 'https://api.everythinglocation.com'
    //remove trailing slash if any
    this._endpoint = this._endpoint.replace(/\/$/, '')
  }

  get headers() {
    return this._headers
  }

  set headers(headers) {
    this._headers = headers
  }

  verify(query, callback) {
    this.contactEL('/address/verify', query, callback)
  }

  complete(query, callback) {
    this.contactEL('/address/complete', query, callback)
  }

  email(query, callback) {
    this.contactEL('/email/verify', query, callback)
  }

  capture(query, callback) {
    this.contactEL('/address/capture', query, callback)
  }

  contactEL(path, query, callback) {
    query.lqtkey = this.key

    request
      .post(this.endpoint + path, {
        headers: (this.headers)?this.headers:{
          Accept: 'application/json'
        },
        json: true,
        body: query
      }, (err, res, body) => {
        callback(body)
      })
  }

  //legacy shit
  verifySaas(path, callback) {
    request
      .get(this.endpoint + '/rest/?lqtkey=' + this.key + '&' + path, {
        headers: {
          Accept: 'application/json'
        }
      },
    (err, res, body) => {
        callback(body)
    })
  }
}

module.exports = (apikey = null, endpoint = null) => {
  return new EverythingLocation(apikey, endpoint)
}
