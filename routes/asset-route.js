"use strict";

const router = require("express").Router();
const { ResponseEntry } = require("../middlewares/construct-response");
const assetServices = require("../service/asset-service");
const messages = require("../middlewares/error-message");

async function createAsset(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      responseEntries.data = await assetServices.createAsset(req.body);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.status(responseEntries.code).json(responseEntries);
    }
}

async function getAsset(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      req.query.isActive = true
      req.query.isObsolete = 'false'
      responseEntries.data = await assetServices.getAsset(req.query);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      if(req.query.isGet === 'true'){
        res.status(responseEntries.code).json(responseEntries);
      }else{
        res.render('asset.jade', { assetData: JSON.stringify(responseEntries.data),
          currentUrl: req.url
         });
      }
     
    }
}

async function getScrapAsset(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      req.query.isActive = true
      responseEntries.data = await assetServices.getScrapAsset(req.query);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      if(req.query.isGet === 'true'){
        res.status(responseEntries.code).json(responseEntries);
      }else{
        res.render('scrap-asset.jade', { assetData: JSON.stringify(responseEntries.data),
          currentUrl: req.url
         });
      }
     
    }
}

async function updateAsset(req, res) {
  const responseEntries = new ResponseEntry();
  try {
    responseEntries.data = await assetServices.updateAsset(req.params.assetId, req.body);
    if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;;
  } catch (error) {
    responseEntries.error = true;
    responseEntries.message = (error.message) ? error.message : error;
    responseEntries.code = 503;
  } finally {
    res.status(responseEntries.code).json(responseEntries);
  }
}

router.get("/asset", getAsset);
router.get("/", getAsset);
router.get("/index", getAsset);
router.get("/scrap-asset", getScrapAsset);
router.post("/asset", createAsset);
router.put('/asset/:assetId', updateAsset);

module.exports = router;