"use strict";

const router = require("express").Router();
const { ResponseEntry } = require("../middlewares/construct-response");
const eventsServices = require("../service/events-service");
const messages = require("../middlewares/error-message");

async function createEvents(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      responseEntries.data = await eventsServices.createEvents(req.body);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.status(responseEntries.code).json(responseEntries);
    }
}

async function getEvents(req, res) {
    const responseEntries = new ResponseEntry();
    try {
      req.query.isActive = true
      responseEntries.data = await eventsServices.getEvents(req.query);
      if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
      responseEntries.error = true;
      responseEntries.message = error.message ? error.message : error;
      responseEntries.code = 503;
    } finally {
      res.render('events.jade', { eventData: JSON.stringify(responseEntries.data),
        currentUrl: req.url
       });
    }
}

async function updateEvents(req, res) {
  const responseEntries = new ResponseEntry();
  try {
    responseEntries.data = await eventsServices.updateEvents(req.params.eventsId, req.body);
    if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;;
  } catch (error) {
    responseEntries.error = true;
    responseEntries.message = (error.message) ? error.message : error;
    responseEntries.code = 503;
  } finally {
    res.status(responseEntries.code).json(responseEntries);
  }
}

router.get("/events", getEvents);
router.post("/events", createEvents);
router.put('/events/:eventsId', updateEvents);

module.exports = router;