"use strict";

const sequelize = require('../models/index').sequelize;
const messages = require("../middlewares/error-message");
const _ = require('lodash');
const { Op } = require('sequelize');
const { createAssetHistory } = require('./asset-history-service');

async function createAsset(postData) {
    try {
        const findCode = await sequelize.models.asset.findAll({
            attributes: [
                ['id', 'assetId'],
                ['serial_no', 'serialNo']
            ],
            limit: 1,
            order: [['id', 'DESC']]
        }).then(result => {
            const format = `ASSET-`
            if (result.length > 0) {
                const count = result[0].dataValues.serialNo.replace('ASSET-', '')
                postData.serialNo = `${format}${(parseInt(count) + 1).toString().padStart(5, '0')}`
            } else {
                postData.serialNo = `${format}00001`
            }
        }).catch(err => {
            throw err;
        })
        const excuteMethod = _.mapKeys(postData, (value, key) => _.snakeCase(key))
        const asset = await sequelize.models.asset.create(excuteMethod);
        const historyReq={
            eventTypeId : 1,
            assetId : asset.id,
            notes : "Asset Created"
        }
        const assetHistroy = await createAssetHistory(historyReq)
        const req = {
            assetId: asset.id
        }
        return await getAsset(req);
    } catch (error) {
        console.error(error);
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function getScrapAsset(query) {
    try {
        let iql = {};
        if (query && Object.keys(query).length) {
            if (query.assetId) {
                iql.id = query.assetId;
            }
            if (query.isActive) {
                iql.is_active = query.isActive;
            }
            if (query.isObsolete) {
                iql.is_obsolete = query.isObsolete;
            }
        }
        const employee = await sequelize.models.asset.findAll({
            attributes: [['id', 'assetId'],
            ['asset_name', 'assetName'],
            ['serial_no', 'serialNo'],
            ['asset_type_id', 'assetTypeId'], [sequelize.col('asset_category.asset_category_name'), 'assetTypeName'],   
            ['is_obsolete', 'isObsolete'],
            ['is_active', 'isActive'],
            ['createdAt', 'createdAt']],
            where: iql,
            include: [
            {
                model: sequelize.models.asset_category,
                as: 'asset_category',
                required: false,
                on: {
                    id: {
                        [Op.eq]: sequelize.col('asset.asset_type_id')
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
async function getAsset(query) {
    try {
        let iql = {};
        if (query && Object.keys(query).length) {
            if (query.assetId) {
                iql.id = query.assetId;
            }
            if (query.isActive) {
                iql.is_active = query.isActive;
            }
            if (query.isObsolete) {
                iql.is_obsolete = query.isObsolete;
            }
        }
        const employee = await sequelize.models.asset.findAll({
            attributes: [['id', 'assetId'],
            ['asset_name', 'assetName'],
            ['serial_no', 'serialNo'],
            ['asset_type_id', 'assetTypeId'], [sequelize.col('asset_category.asset_category_name'), 'assetTypeName'],
            ['branch_id', 'branchId'], [sequelize.col('branch.branch_name'), 'branchName'],
                'make',
                'modal',
            ['purchase_date', 'purchaseDate'],
            ['purchase_value', 'purchaseValue'],
            ['is_in_stock', 'isInStock'],
            ['is_obsolete', 'isObsolete'],
            ['is_obsolete', 'obsoleteReason'],
            ['is_active', 'isActive'],
            ['createdAt', 'createdAt']],
            where: iql,
            include: [{
                model: sequelize.models.branch,
                as: 'branch',
                required: false,
                on: {
                    id: {
                        [Op.eq]: sequelize.col('asset.branch_id')
                    }
                },
                attributes: []
            },
            {
                model: sequelize.models.asset_category,
                as: 'asset_category',
                required: false,
                on: {
                    id: {
                        [Op.eq]: sequelize.col('asset.asset_type_id')
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

async function updateAsset(assetId, putData) {
    try {
        const excuteMethod = _.mapKeys(putData, (value, key) => _.snakeCase(key))
        const employee = await sequelize.models.asset.update(excuteMethod, { where: { id: assetId } });
        const req = {
            assetId: assetId
        }
        return await getAsset(req);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    createAsset,
    getScrapAsset,
    getAsset,
    updateAsset
};
