var request = require('request');

module.exports = {
	verify: function(array) {
		console.log("test");
	}
};

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