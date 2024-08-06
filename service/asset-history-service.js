"use strict";

const sequelize = require('../models/index').sequelize;
const messages = require("../middlewares/error-message");
const _ = require('lodash');
const { Op } = require('sequelize');

async function createAssetHistory(postData) {
    try {
        const excuteMethod = _.mapKeys(postData, (value, key) => _.snakeCase(key))
        const assetHistory = await sequelize.models.asset_history.create(excuteMethod);
        const req = {
            assetHistoryId: assetHistory.id
        }
        return await getAssetHistory(req);
    } catch (error) {
        console.error(error);
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function getAssetHistory(query) {
    try {
        let iql = {};
        if (query && Object.keys(query).length) {
            if (query.assetHistoryId) {
                iql.id = query.assetHistoryId;
            }
            if (query.isActive) {
                iql.is_active = query.isActive;
            }
            if (query.eventId) {
                iql.event_type_id = query.eventId;
            }
        }
        const employee = await sequelize.models.asset_history.findAll({
            attributes: [['id', 'assetHistoryId'],
            ['event_type_id', 'eventTypeId'], [sequelize.col('event.event_name'), 'eventName'],
            ['asset_id', 'assetId'], [sequelize.col('asset.serial_no'), 'serialNo'],
            [sequelize.col('asset.asset_name'), 'assetName'],
            ['employee_id', 'employeeId'], [sequelize.col('employee.employee_name'), 'employeeName'],
            ['issue_date', 'issueDate'],
            ['notes', 'notes'],
            ['is_active', 'isActive'], ['createdAt', 'createdAt']],
            where: iql,
            include: [{
                model: sequelize.models.employee,
                as: 'employee',
                required: false,
                on: {
                    id: {
                        [Op.eq]: sequelize.col('asset_history.employee_id')
                    }
                },
                attributes: []
            },
            {
                model: sequelize.models.events,
                as: 'event',
                required: false,
                on: {
                    id: {
                        [Op.eq]: sequelize.col('asset_history.event_type_id')
                    }
                },
                attributes: []
            },
            {
                model: sequelize.models.asset,
                as: 'asset',
                required: false,
                on: {
                    id: {
                        [Op.eq]: sequelize.col('asset_history.asset_id')
                    }
                },
                attributes: []
            }
            ],
            raw: true,
            nest: false
        });
        return employee;
    } catch (error) {
        console.log(error)
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function updateAssetHistory(assetHistoryId, putData) {
    try {
        const excuteMethod = _.mapKeys(putData, (value, key) => _.snakeCase(key))
        const employee = await sequelize.models.asset_history.update(excuteMethod, { where: { id: assetHistoryId } });
        const req = {
            assetHistoryId: assetHistoryId
        }
        return await getAssetHistory(req);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAssetHistory,
    getAssetHistory,
    updateAssetHistory
};
