"use strict";
/* tslint:disable */
const tsoa_1 = require('tsoa');
const usersController_1 = require('./controllers/usersController');
const multiplePosts_1 = require('./controllers/multiplePosts');
const models = {
    'SDSBattery': {
        'dev_id': { typeName: 'string', required: true },
        'server_time_stamp': { typeName: 'datetime', required: true },
        'int_value': { typeName: 'number', required: true },
        'stat_type': { typeName: 'number', required: true },
        'time_stamp': { typeName: 'datetime', required: true },
    },
    'SDS': {
        'metadata': { typeName: 'string', required: true },
        'createdAt': { typeName: 'datetime', required: true },
        'data': { typeName: 'array', required: false, arrayType: 'string' },
    },
    'ListBatteryStats': {
        'stats': { typeName: 'array', required: true, arrayType: 'SDSBattery' },
    },
};
function RegisterRoutes(app) {
    app.post('/Devices/Stat', function (req, res, next) {
        const params = {
            'request': { typeName: 'SDSBattery', required: true },
        };
        let validatedParams = [];
        try {
            validatedParams = getValidatedParams(params, req, 'request');
        }
        catch (err) {
            return next(err);
        }
        const controller = new usersController_1.SDSController();
        promiseHandler(controller.Create.apply(controller, validatedParams), res, next);
    });
    app.post('/Devices/MultipleStats/MultiplePosts', function (req, res, next) {
        const params = {
            'request': { typeName: 'ListBatteryStats', required: true },
        };
        let validatedParams = [];
        try {
            validatedParams = getValidatedParams(params, req, 'request');
        }
        catch (err) {
            return next(err);
        }
        const controller = new multiplePosts_1.MultiplePostsController();
        promiseHandler(controller.Create.apply(controller, validatedParams), res, next);
    });
    function promiseHandler(promise, response, next) {
        return promise
            .then((data) => {
            if (data) {
                response.json(data);
            }
            else {
                response.status(204);
                response.end();
            }
        })
            .catch((error) => next(error));
    }
    function getRequestParams(request, bodyParamName) {
        const merged = {};
        if (bodyParamName) {
            merged[bodyParamName] = request.body;
        }
        for (let attrname in request.params) {
            merged[attrname] = request.params[attrname];
        }
        for (let attrname in request.query) {
            merged[attrname] = request.query[attrname];
        }
        return merged;
    }
    function getValidatedParams(params, request, bodyParamName) {
        const requestParams = getRequestParams(request, bodyParamName);
        return Object.keys(params).map(key => {
            if (params[key].injected === 'inject') {
                return undefined;
            }
            else if (params[key].injected === 'request') {
                return request;
            }
            else {
                return tsoa_1.ValidateParam(params[key], requestParams[key], models, key);
            }
        });
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=routes.js.map