"use strict";

const router = require("express").Router();
const { ResponseEntry } = require("../middlewares/construct-response");
const issuseAssetsServices = require("../service/issuse-assets-service");
const messages = require("../middlewares/error-message");

async function createIssuseAssets(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      responseEntries.data = await issuseAssetsServices.createIssuseAssets(req.body);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.status(responseEntries.code).json(responseEntries);
    }
}

async function getIssuseAssets(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      req.query.isActive = true
        req.query.isObsolete = 'false'
      responseEntries.data = await issuseAssetsServices.getIssuseAssets(req.query);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.render('issuse-asset.jade', { issuseAssetData: JSON.stringify(responseEntries.data),
        currentUrl: req.url
       });
    }
}

async function updateIssuseAssets(req, res) {
  const responseEntries = new ResponseEntry();
  try {
    responseEntries.data = await issuseAssetsServices.updateIssuseAssets(req.params.issuseAssetsId, req.body);
    if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;;
  } catch (error) {
    responseEntries.error = true;
    responseEntries.message = (error.message) ? error.message : error;
    responseEntries.code = 503;
  } finally {
    res.status(responseEntries.code).json(responseEntries);
  }
}

router.get("/issuse-assets", getIssuseAssets);
router.post("/issuse-assets", createIssuseAssets);
router.put('/issuse-assets/:issuseAssetsId', updateIssuseAssets);

module.exports = router;