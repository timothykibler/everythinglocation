var should = require('chai').should(),
	el = require('../everythinglocation'),
	authenticate = el.authenticate,
	verify = el.verify;

	describe('#authenticate()', function() {
		it('authenticates the user', function() {
			authenticate('', '').should.not.equal(null);
		});
	});

	/*describe(#verify, function() {
		it('verifies an address', function() {
			verify([{Address1:'999 Baker Way', Country:'USA'}]).should.have.property('CountryName', 'USA');
		});
	});*/