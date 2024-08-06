"use strict";

const router = require("express").Router();
const { ResponseEntry } = require("../middlewares/construct-response");
const returnAssetsServices = require("../service/return-assets-service");
const messages = require("../middlewares/error-message");

async function createReturnAssets(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      responseEntries.data = await returnAssetsServices.createReturnAssets(req.body);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.status(responseEntries.code).json(responseEntries);
    }
}

async function getReturnAssets(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      req.query.isActive = true
      responseEntries.data = await returnAssetsServices.getReturnAssets(req.query);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.render('return-asset.jade', { returnAssetData: JSON.stringify(responseEntries.data),
        currentUrl: req.url
       });
    }
}

async function updateReturnAssets(req, res) {
  const responseEntries = new ResponseEntry();
  try {
    responseEntries.data = await returnAssetsServices.updateReturnAssets(req.params.returnAssetsId, req.body);
    if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;;
  } catch (error) {
    responseEntries.error = true;
    responseEntries.message = (error.message) ? error.message : error;
    responseEntries.code = 503;
  } finally {
    res.status(responseEntries.code).json(responseEntries);
  }
}

router.get("/return-assets", getReturnAssets);
router.post("/return-assets", createReturnAssets);
router.put('/return-assets/:returnAssetsId', updateReturnAssets);

module.exports = router;