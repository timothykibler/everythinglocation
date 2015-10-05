'use strict';

var chai = require('chai'),
	sinon = require('sinon'),
	chaiAsPromised = require('chai-as-promised'),
	sinonChai = require("sinon-chai"),
	should = require('chai').should(),
	request = require('request'),
	el = require('../everythinglocation'),
	authenticate = el.authenticate,
	verify = el.verify
	chai.use(sinonChai);

	describe('#authenticate()', function() {

		describe('successful login', function() {
			before(function(done) {
			sinon.stub(request, 'get').yields(null, null, JSON.stringify({Status: 'OK'}));
			done();
			});
	
			it('authenticates a user', function(done) {
				 authenticate('good.user@gooduser.com', 'goodpassword', function(result) {
				 	result.should.have.property('Status').equal('OK');
				 	done();
				 });
			});
	
			after(function(done) {
				request.get.restore();
				done();
			});
		});

		describe('unsuccessful login', function() {
			before(function(done) {
				sinon.stub(request, 'get').yields(null, null, JSON.stringify({Status: 'Err'}));
				done();
			});

			it('fails to authenticate a user', function(done) {
				authenticate('bad.user@baduser.com', 'badpassword', function(result) {
					result.should.have.property('Status').equal('Err');
					done();
				});
			});

			after(function(done) {
				request.get.restore();
				done();
			});
		});
	});

	/*describe(#verify, function() {
		it('verifies an address', function() {
			verify([{Address1:'999 Baker Way', Country:'USA'}]).should.have.property('CountryName', 'USA');
		});
	});*/