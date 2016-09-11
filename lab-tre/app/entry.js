'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
angular.module('listApp', []);

require('./controller/list_controller.js');
