'use strict';

const middlewareFactoryList = require('./middleware-list');

module.exports = function middlewareFactory(config) {
    return middlewareFactoryList.map(factory => factory(config));
};
