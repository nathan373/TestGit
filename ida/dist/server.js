"use strict";
require('./controllers/usersController');
require('./controllers/multiplePosts');
const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const routes_1 = require('./routes');
let config = require('../appconfig.json');
const app = express();
const swaggerPath = __dirname + '/swagger.json';
exports.app = app;
app.use('/docs', express.static(__dirname + '/swagger-ui'));
app.use('/', express.static(__dirname + '/swagger-ui'));
app.use('/swagger.json', (req, res) => {
    res.sendfile(swaggerPath);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
routes_1.RegisterRoutes(app);
/* tslint:disable-next-line */
console.log('Starting server.. http://localhost:' + config.port + '/docs');
app.listen(config.port);
//# sourceMappingURL=server.js.map