'use strict';

var chai = require('chai'),
	sinon = require('sinon'),
	chaiAsPromised = require('chai-as-promised'),
	sinonChai = require("sinon-chai"),
	expect = require('chai').expect,
	request = require('request'),
	el = require('../everythinglocation'),
	authenticate = el.authenticate,
	verify = el.verify,
	capture = el.capture;
	chai.use(sinonChai);

	describe('#authenticate()', function() {

		describe('successful login', function() {
			before(function(done) {
			sinon.stub(request, 'get').yields(null, null, JSON.stringify({Status: 'OK'}));
			done();
			});
	
			it('authenticates a user', function(done) {
				 authenticate('good.user@gooduser.com', 'goodpassword', function(result) {
				 	expect(result).to.have.property('Status').equal('OK');
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
					expect(result).to.have.property('Status').equal('Error');
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
				sinon.stub(request, 'post').yields(null, null, {CountryName:'USA'});
				done();
			});
	
			it('verifies an address', function(done) {
				verify([{Address1:'999 Baker Way', Country:'USA'}], function(result) {
					expect(result).to.have.property('CountryName').equal('USA');
					done();
				}); 
			});
	
			after(function(done) {
				request.post.restore();
				done();
			});
		});
	});

	describe('#capture()', function() {
		it('should exist', function() {
			expect(capture).to.not.be.undefined;
		});
		
		describe('working callback', function() {
			var spy = sinon.spy();
			var data = {
				query:'999 Baker Way', 
				country: 'usa'
			};

			beforeEach(function(done) {
				sinon.stub(request, 'post').yields(null, null, {Status: 'OK', output: [
					{result: '999 Baker Way Ste 100, San Mateo CA'},
					{result: '999 Baker Way Ste 110, San Mateo CA'},
					{result: '999 Baker Way Ste 120, San Mateo CA'},
					]});
				done();
			});	

			it('should have a working callback', function() {
				capture(data, spy);
				expect(spy).to.have.been.called;
			});	

			it('should give back an OK status', function() {
				capture(data, function(result) {
					expect(result).to.have.property('Status').equal('OK');
				});
			});

			it('should have an array of results', function() {
				capture(data, function(result) {
					expect(result).to.have.property('output').a('Array');
				});	
			});

			afterEach(function(done) {
				request.post.restore();
				done();
			});
		});
	});