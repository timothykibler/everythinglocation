'use strict';

const chai = require('chai'),
	sinon = require('sinon'),
	chaiAsPromised = require('chai-as-promised'),
	sinonChai = require('sinon-chai'),
	expect = require('chai').expect,
	request = require('request'),
	everythinglocation = require('../everythinglocation')
	chai.use(sinonChai)

//block it so every assertion can use it
let el = null

describe('Create an instance of EverythingLocation and have usable functions', () => {
	before( (done) => {
		el = new everythinglocation.EverythingLocation('APIKEY')
		done()
	})

	it('should be an object', () => {
		expect(el).to.be.a('object')
	})

	it('should have function #verify()', () => {
		expect(el.verify).to.be.a('function')
	})

	it('should have function #complete()', () => {
		expect(el.complete).to.be.a('function')
	})

	it('should have function #capture()', () => {
		expect(el.capture).to.be.a('function')
	})

	it('should have function #email()', () => {
		expect(el.email).to.be.a('function')
	})

	it('should have function #contactEL()', () => {
		expect(el.contactEL).to.be.a('function')
	})
})
