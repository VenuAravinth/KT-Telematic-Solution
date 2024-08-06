'use strict';

const express = require('express');
const middlewareFactory = require('./middlewares');

const app = express();

app.use(express.static('assets'));
app.set('view engine', 'pug');

// Set the views directory
app.set('views', './views');

app.use(middlewareFactory());

app.use(express.static('public'));
app.use('/js', express.static('js'));

module.exports = app;