'use strict'
var request = require('request')

class EverythingLocation {
	constructor(apikey) {
		this.key = apikey || null;
	}

	get key() {
		return this._key
	}

	set key(apikey) {
		this._key = apikey || null;
	}

	verify(query, callback) {
		this.contactEL('address/verify', query, callback)
	}

	complete(query, callback) {
		this.contactEL('address/complete', query, callback)
	}

	email(query, callback) {
		this.contactEL('email/verify', query, callback)
	}

	capture(query, callback) {
		this.contactEL('address/capture', query, callback)
	}

	contactEL(path, query, callback) {
		query.lqtkey = this.key
		request
			.post('https://api.everythinglocation.com/' + path, {
				headers: {
					Accept: 'application/json'
				},
				json: true,
				body: query
			}, (err, res, body) => {
				callback(body)
			})
	}
}

module.exports.EverythingLocation = EverythingLocation
