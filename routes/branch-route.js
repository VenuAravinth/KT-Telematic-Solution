"use strict";

const router = require("express").Router();
const { ResponseEntry } = require("../middlewares/construct-response");
const branchServices = require("../service/branch-service");
const messages = require("../middlewares/error-message");

async function createBranch(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      responseEntries.data = await branchServices.createBranch(req.body);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.status(responseEntries.code).json(responseEntries);
    }
}

async function getBranch(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      req.query.isActive = true
      responseEntries.data = await branchServices.getBranch(req.query);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      if(req.query.isGet === 'true'){
        res.status(responseEntries.code).json(responseEntries);
      }else{
        res.render('branch.jade', { branchData: JSON.stringify(responseEntries.data),
          currentUrl: req.url
         });
      }
    }
}

async function updateBranch(req, res) {
  const responseEntries = new ResponseEntry();
  try {
    responseEntries.data = await branchServices.updateBranch(req.params.branchId, req.body);
    if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;;
  } catch (error) {
    responseEntries.error = true;
    responseEntries.message = (error.message) ? error.message : error;
    responseEntries.code = 503;
  } finally {
    res.status(responseEntries.code).json(responseEntries);
  }
}

router.get("/branch", getBranch);
router.post("/branch", createBranch);
router.put('/branch/:branchId', updateBranch);

module.exports = router;