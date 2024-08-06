"use strict";

const router = require("express").Router();
const { ResponseEntry } = require("../middlewares/construct-response");
const assetCategoryServices = require("../service/asset-category-service");
const messages = require("../middlewares/error-message");

async function createAssetCategory(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      responseEntries.data = await assetCategoryServices.createAssetCategory(req.body);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.status(responseEntries.code).json(responseEntries);
    }
}

async function getAssetCategory(req, res) {
    const responseEntries = new ResponseEntry();
    let checkGet = ""
    try {
      console.log(req.query)
      req.query.isActive = true
      responseEntries.data = await assetCategoryServices.getAssetCategory(req.query);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      if(req.query.isGet === 'true'){
        res.status(responseEntries.code).json(responseEntries);
      }else{
        res.render('asset-category.jade', { assetCategory: JSON.stringify(responseEntries.data),
          currentUrl: req.url
         })
      }
    }
}

async function updateAssetCategory(req, res) {
  const responseEntries = new ResponseEntry();
  try {
    responseEntries.data = await assetCategoryServices.updateAssetCategory(req.params.assetCategoryId, req.body);
    if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;;
  } catch (error) {
    responseEntries.error = true;
    responseEntries.message = (error.message) ? error.message : error;
    responseEntries.code = 503;
  } finally {
    res.status(responseEntries.code).json(responseEntries);
  }
}

router.get("/asset-category", getAssetCategory);
router.post("/asset-category", createAssetCategory);
router.put('/asset-category/:assetCategoryId', updateAssetCategory);

module.exports = router;