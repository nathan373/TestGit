"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by vdave on 12/2/2016.
 */
const mocha_typescript_1 = require('mocha-typescript');
const config = require('../appconfig.json');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();
let expect = chai.expect;
const testData = {
    'createdAt': '2016-12-02T17:28:44.996Z',
    'metadata': 'To Be Defined',
    'data': [{
            'NumberOfDevices': '8',
            'DischargeRate': 3
        }, {
            'NumberOfDevices': '30',
            'DischargeRate': 4
        }, {
            'NumberOfDevices': '71',
            'DischargeRate': 5
        }, {
            'NumberOfDevices': '62',
            'DischargeRate': 6
        }, {
            'NumberOfDevices': '31',
            'DischargeRate': 7
        }, {
            'NumberOfDevices': '15',
            'DischargeRate': 8
        }, {
            'NumberOfDevices': '2',
            'DischargeRate': 9
        }, {
            'NumberOfDevices': '2',
            'DischargeRate': 10
        }, {
            'NumberOfDevices': '4',
            'DischargeRate': 11
        }, {
            'NumberOfDevices': '2',
            'DischargeRate': 12
        }, {
            'NumberOfDevices': '1',
            'DischargeRate': 14
        }, {
            'NumberOfDevices': '1',
            'DischargeRate': 17
        }, {
            'NumberOfDevices': '1',
            'DischargeRate': 19
        }]
};
let Hello = class Hello {
    assert_pass_async(done) {
        setTimeout(() => done(), 1);
    }
    assert_fail_async(done) {
        setTimeout(() => done(new Error('Oops...')), 1);
    }
    assert_pass_putSampleData(done) {
        const testPutData = {
            'dev_id': '12345678901234567890123456789012345678901234567890123456789012345678901234567890',
            'server_time_stamp': new Date(),
            'int_value': 191231231319,
            'stat_type': 12345,
            'time_stamp': new Date()
        };
        chai.use(chaiHttp);
        chai.request(server.app)
            .post('/Data')
            .set('X-API-key', config['aws-x-api-key'])
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(testPutData)
            .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(err).to.be.null;
            done();
        });
    }
    assert_fail_putSampleData(done) {
        const testPutData = {
            'metadaata': 'here is where metadata explaining the data should go',
            'createdAt': '2016-08-08',
            'data': [
                'aaa',
                'bbb',
                'ccc'
            ]
        };
        chai.use(chaiHttp);
        chai.request(server.app)
            .post('/Data')
            .set('X-API-key', config['aws-x-api-key'])
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(testPutData)
            .end((err, res) => {
            expect(res).to.have.status(400);
            done();
        });
    }
    assert_fail_missingApiKey(done) {
        const testPutData = {
            'metadata': 'here is where metadata explaining the data should go',
            'createdAt': '2016-08-08',
            'data': [
                'aaa',
                'bbb',
                'ccc'
            ]
        };
        chai.use(chaiHttp);
        chai.request(server.app)
            .post('/Data')
            .set('X-API-key', 'aaaa')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(testPutData)
            .end((err, res) => {
            expect(res).to.have.status(400);
            done();
        });
    }
};
__decorate([
    mocha_typescript_1.test('should pass async tests')
], Hello.prototype, "assert_pass_async", null);
__decorate([
    mocha_typescript_1.test('should fail async when given error')
], Hello.prototype, "assert_fail_async", null);
__decorate([
    mocha_typescript_1.test('should pass put data to /DATA api')
], Hello.prototype, "assert_pass_putSampleData", null);
__decorate([
    mocha_typescript_1.test('should fail put data to /DATA api due to malformed input - typo in metadata')
], Hello.prototype, "assert_fail_putSampleData", null);
__decorate([
    mocha_typescript_1.test('should fail put data to /DATA api due to wrong data type')
], Hello.prototype, "assert_fail_missingApiKey", null);
Hello = __decorate([
    mocha_typescript_1.suite
], Hello);
/**
 * Created by vdave on 12/5/2016.
 */
//# sourceMappingURL=test.js.map