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
				sinon.stub(request, 'get').yields(null, null, JSON.stringify({Status: 'Error'}));
				done();
			});

			it('fails to authenticate a user', function(done) {
				authenticate('bad.user@baduser.com', 'badpassword', function(result) {
					result.should.have.property('Status').equal('Error');
					done();
				});
			});

			after(function(done) {
				request.get.restore();
				done();
			});
		});
	});

	describe('#verify()', function() {

		describe('successful verification', function() {
			before(function(done) {
			sinon.stub(request, 'post').yields(null, null, JSON.stringify({CountryName:'USA'}));
			done();
			});
	
			it('verifies an address', function(done) {
				verify([{Address1:'999 Baker Way', Country:'USA'}], function(result) {
					result.should.have.property('CountryName').equal('USA');
					done();
				}); 
			});
	
			after(function(done) {
				request.post.restore();
				done();
			});
		});
	});