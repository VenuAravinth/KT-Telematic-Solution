'use strict';

const express = require('express');
const router = new express.Router();

router.use(require('./asset-category-route'));
router.use(require('./employee-route'));
router.use(require('./branch-route'));
router.use(require('./events-route'));
router.use(require('./issuse-assets-route'));
router.use(require('./return-asstes-route'));
router.use(require('./asset-route'));
router.use(require('./asset-history-route'));

module.exports = router;