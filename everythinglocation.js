var request = require('request');

module.exports.authenticate = function(username, password, callback) {
	request.get('https://api.everythinglocation.com/user/verify', {
			auth: {
				user: username,
				pass: password
			},
			headers: {
				Accept: 'application/json'
			}
	}, function (error, response, body) {
		callback(JSON.parse(body));
	});
};

module.exports.verify = function(query, callback) {
	request.post('https://api.everythinglocation.com/address/verify', {
		headers: {
			Accept: 'application/json'
		},
		json: true,
		body: query
	}, function(error, response, body) {
		callback(body);
	});
};

module.exports.complete = function(query, callback) {
	request.post('https://api.everythinglocation.com/address/complete', {
		headers: {
			Accept: 'application/json'
		},
		json: true,
		body: query
	}, function(error, response, body) {
		callback(body);
	});
};