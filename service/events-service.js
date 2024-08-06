"use strict";

const sequelize = require('../models/index').sequelize;
const messages = require("../middlewares/error-message");
const _ = require('lodash');

async function createEvents(postData) {
    try {
        const excuteMethod = _.mapKeys(postData, (value, key) => _.snakeCase(key))
        const event = await sequelize.models.events.create(excuteMethod);
        const req = {
            eventsId: event.id
        }
        return await getEvents(req);
    } catch (error) {
        console.error(error);
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function getEvents(query) {
    try {
        let iql = {};
        if (query && Object.keys(query).length) {
            if (query.eventsId) {
                iql.id = query.eventsId;
            }
            if (query.isActive) {
                iql.is_active = query.isActive;
            }
        }
        const employee = await sequelize.models.events.findAll({
            attributes: [['id', 'eventId'], ['event_name', 'eventsName'],
            ['is_active', 'isActive'],['createdAt', 'createdAt']],
            where: iql,
        });
        return employee;
    } catch (error) {
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function updateEvents(eventId, putData) {
    try {
        const excuteMethod = _.mapKeys(putData, (value, key) => _.snakeCase(key))
        const employee = await sequelize.models.events.update(excuteMethod, { where: { id: eventId } });
        const req = {
            eventsId: eventId
        }
        return await getEvents(req);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createEvents,
    getEvents,
    updateEvents
};
