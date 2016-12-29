"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const tsoa_1 = require('tsoa');
// import * as https from 'https';
const config = require('../../appconfig.json');
const awsPush = require('../awsPush');
let MultiplePostsController = class MultiplePostsController {
    /**
     * Post a unit of data to be stored in the cloud analytics database
     */
    Create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.stats.length > 500) {
                throw new Error('Maximum Record input Length Exceeded: ' + request.stats.length);
            }
            if (request.stats.length < 1) {
                throw new Error('Minimum Record input Length of 1 not met: ' + request.stats.length);
            }
            awsPush.putRecordBatch(request);
            return {
                metadata: 'Thanks a lot: records that will be sent = ' + request.stats.length,
                createdAt: new Date()
            };
        });
    }
};
__decorate([
    tsoa_1.Post('MultiplePosts'),
    tsoa_1.Example({
        headers: {
            'X-API-key': 'Future Private Access Key',
            'Accept': 'application/json'
        },
        json: true,
        url: 'http://localhost:3003/data',
        data: {
            dev_id: '12345678901234567890123456789012345678901234567890123456789012345678901234567890',
            server_time_stamp: '2016-12-08T19:12:15.235Z',
            int_value: 123456789123,
            stat_type: 1234,
            time_stamp: '2016-12-08T19:13:15.235Z'
        }
    })
], MultiplePostsController.prototype, "Create", null);
MultiplePostsController = __decorate([
    tsoa_1.Route('Devices/MultipleStats')
], MultiplePostsController);
exports.MultiplePostsController = MultiplePostsController;
/**
 * Created by vdave on 12/6/2016.
 */
//# sourceMappingURL=multiplePosts.js.map