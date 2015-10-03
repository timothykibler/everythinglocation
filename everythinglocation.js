var request = require('request');

module.exports = {
	authenticate: function(username, password, callback) {
		request({
			url: 'https://api.everythinglocation.com/user/verify',
			method: 'GET',
			auth: {
				user: username,
				pass: password
			},
			headers: {
				Accept: 'application/json'
			}
		}, function(error, response, body){
			callback(JSON.parse(body).User);
		});
	},
	verify: function(array) {
		console.log("test");
	}
};