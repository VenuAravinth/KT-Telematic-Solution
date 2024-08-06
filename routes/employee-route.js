"use strict";

const router = require("express").Router();
const { ResponseEntry } = require("../middlewares/construct-response");
const employeeServices = require("../service/employee-service");
const messages = require("../middlewares/error-message");

async function createEmployee(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      responseEntries.data = await employeeServices.createEmployee(req.body);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.status(responseEntries.code).json(responseEntries);
    }
}

async function getEmployee(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      responseEntries.data = await employeeServices.getEmployee(req.query);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      if(req.query.isGet === 'true'){
        res.status(responseEntries.code).json(responseEntries);
      }else{
        res.render('employee.jade', { employee: JSON.stringify(responseEntries.data),
          currentUrl: req.url
         });
      }
      
    }
}

async function updateEmployee(req, res) {
  const responseEntries = new ResponseEntry();
  try {
    responseEntries.data = await employeeServices.updateEmployee(req.params.employeeId, req.body);
    if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;;
  } catch (error) {
    responseEntries.error = true;
    responseEntries.message = (error.message) ? error.message : error;
    responseEntries.code = 503;
  } finally {
    res.status(responseEntries.code).json(responseEntries);
  }
}

router.get("/employee", getEmployee);
router.post("/employee", createEmployee);
router.put('/employee/:employeeId', updateEmployee);

module.exports = router;