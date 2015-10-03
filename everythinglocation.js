var request = require('request');

module.exports = {
	authenticate: function(username, password) {
		request({
			url: 'https://api.everythinglocation.com/user/verify',
			method: 'GET',
			auth: {
				user: username,
				pass: password
			}
		}, function(error, response, body){
			console.log(body);
			throw new Error('response');
			console.log(response);
		});
		return 'whatever';
	},
	verify: function(array) {

	}
};