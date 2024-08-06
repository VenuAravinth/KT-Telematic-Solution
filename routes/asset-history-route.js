"use strict";

const router = require("express").Router();
const { ResponseEntry } = require("../middlewares/construct-response");
const assetHistoryServices = require("../service/asset-history-service");
const messages = require("../middlewares/error-message");

async function createAssetHistory(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      responseEntries.data = await assetHistoryServices.createAssetHistory(req.body);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.status(responseEntries.code).json(responseEntries);
    }
}

async function getAssetHistory(req, res) {
    const responseEntries = new ResponseEntry();
    let purchaseData = []
    let issuseAssetData = []
    let returnAssetData = []
    try {
      req.query.isActive = true
      req.query.eventId = 1
      purchaseData = await assetHistoryServices.getAssetHistory(req.query);
      req.query.isActive = true
      req.query.eventId = 2
      issuseAssetData = await assetHistoryServices.getAssetHistory(req.query);
      req.query.isActive = true
      req.query.eventId = 3
      returnAssetData = await assetHistoryServices.getAssetHistory(req.query);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      console.log(purchaseData)
      res.render('asset-history.jade', { 
        purchaseData: JSON.stringify(purchaseData),
        issuseAssetData: JSON.stringify(issuseAssetData),
        returnAssetData: JSON.stringify(returnAssetData),
        currentUrl: req.url
       });
    }
}

async function updateAssetHistory(req, res) {
  const responseEntries = new ResponseEntry();
  try {
    responseEntries.data = await assetHistoryServices.updateAssetHistory(req.params.assetHistoryId, req.body);
    if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;;
  } catch (error) {
    responseEntries.error = true;
    responseEntries.message = (error.message) ? error.message : error;
    responseEntries.code = 503;
  } finally {
    res.status(responseEntries.code).json(responseEntries);
  }
}

router.get("/asset-history", getAssetHistory);
router.post("/asset-history", createAssetHistory);
router.put('/asset-history/:assetHistoryId', updateAssetHistory);

module.exports = router;