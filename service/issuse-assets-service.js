"use strict";

const sequelize = require('../models/index').sequelize;
const messages = require("../middlewares/error-message");
const _ = require('lodash');
const { Op } = require('sequelize');
const { createAssetHistory } = require('./asset-history-service');

async function createIssuseAssets(postData) {
    try {
        const excuteMethod = _.mapKeys(postData, (value, key) => _.snakeCase(key))
        const issuseAssets = await sequelize.models.issuse_asset.create(excuteMethod);
        const historyReq={
            eventTypeId : 2,
            employeeId : postData.employeeId,
            assetId : postData.assetId,
            notes : "Issused Asset Created"
        }
        const assetHistroy = await createAssetHistory(historyReq)
        const req = {
            issuseAssetsId: issuseAssets.id
        }
        return await getIssuseAssets(req);
    } catch (error) {
        console.error(error);
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function getIssuseAssets(query) {
    try {
        let iql = {};
        if (query && Object.keys(query).length) {
            if (query.issuseAssetsId) {
                iql.id = query.issuseAssetsId;
            }
            if (query.isActive) {
                iql.is_active = query.isActive;
            }
            if (query.isObsolete) {
                iql.is_obsolete = query.isObsolete;
            }
        }
        const employee = await sequelize.models.asset.findAll({
            attributes: [
              ['id', 'assetId'],
              ['asset_name', 'assetName'],
              ['serial_no', 'serialNo'],
              [sequelize.col('issuse_asset.issuse_date'), 'issuseDate'],
              [sequelize.col('issuse_asset.id'), 'issuseAssetsId'],
              ['is_active', 'isActive'],
              ['createdAt', 'createdAt']
            ],
            where: iql,
            include: [
              {
                model: sequelize.models.issuse_asset,
                as: 'issuse_asset',
                required: false,
                on: {
                  asset_id: {
                    [Op.eq]: sequelize.col('asset.id')
                  }
                },
                attributes: [],
                include: [
                  {
                    model: sequelize.models.employee,
                    as: 'employee',
                    required: true,
                    attributes: []
                  }
                ]
              }
            ],
            raw: true,
            nest: false
          })
        return employee;
    } catch (error) {
        console.log(error)
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function updateIssuseAssets(issuseAssetsId, putData) {
    try {
        const excuteMethod = _.mapKeys(putData, (value, key) => _.snakeCase(key))
        const employee = await sequelize.models.issuse_asset.update(excuteMethod, { where: { id: issuseAssetsId } });
        const historyReq={
            eventTypeId : 2,
            employeeId : putData.employeeId,
            assetId : putData.assetId,
            notes : "Issused Asset Updated",
            updatedAt : "now()"
        }
        const assetHistroy = await createAssetHistory(historyReq)
        const req = {
            issuseAssetsId: issuseAssetsId
        }
        return await getIssuseAssets(req);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createIssuseAssets,
    getIssuseAssets,
    updateIssuseAssets
};
