"use strict";

const sequelize = require('../models/index').sequelize;
const messages = require("../middlewares/error-message");
const _ = require('lodash');
const { Op } = require('sequelize');
const { createAssetHistory } = require('./asset-history-service');

async function createReturnAssets(postData) {
    try {
        const excuteMethod = _.mapKeys(postData, (value, key) => _.snakeCase(key))
        const returnAssets = await sequelize.models.return_asset.create(excuteMethod);
        const historyReq={
            eventTypeId : 3,
            employeeId : postData.employeeId,
            assetId : postData.assetId,
            notes : postData.returnReason
        }
        const assetHistroy = await createAssetHistory(historyReq)
        const req = {
            returnAssetsId: returnAssets.id
        }
        return await getReturnAssets(req);
    } catch (error) {
        console.error(error);
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function getReturnAssets(query) {
    try {
        let iql = {};
        if (query && Object.keys(query).length) {
            if (query.returnAssetsId) {
                iql.id = query.returnAssetsId;
            }
            if (query.isActive) {
                iql.is_active = query.isActive;
            }
        }
        const employee = await sequelize.models.return_asset.findAll({
            attributes: [['id', 'returnAssetsId'], ['employee_id', 'employeeId'],[sequelize.col('employee.employee_name'), 'employeeName'],
            ['asset_id','assetId'],['return_reason','returnReason'],   [sequelize.col('asset.serial_no'), 'serialNo'],
            [sequelize.col('asset.asset_name'), 'assetName'],
            ['return_date','returnDate'],
            ['is_active', 'isActive'],['createdAt', 'createdAt']],
            where: iql,
            include: [{
                model: sequelize.models.employee,
                as: 'employee',
                required: false,
                on: {
                  id: {
                    [Op.eq]: sequelize.col('return_asset.employee_id')
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
                      [Op.eq]: sequelize.col('return_asset.asset_id')
                    }
                  },
                  attributes: []
                }],
              raw: true, 
              nest: false 
        });
        return employee;
    } catch (error) {
        console.log(error)
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function updateReturnAssets(returnAssetsId, putData) {
    try {
        const excuteMethod = _.mapKeys(putData, (value, key) => _.snakeCase(key))
        const employee = await sequelize.models.return_asset.update(excuteMethod, { where: { id: returnAssetsId } });
        const historyReq={
            eventTypeId : 3,
            employeeId : putData.employeeId,
            assetId : putData.assetId,
            notes : putData.returnReason
        }
        const assetHistroy = await createAssetHistory(historyReq)
        const req = {
            returnAssetsId: returnAssetsId
        }
        return await getReturnAssets(req);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createReturnAssets,
    getReturnAssets,
    updateReturnAssets
};
