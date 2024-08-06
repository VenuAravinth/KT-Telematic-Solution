"use strict";

const sequelize = require('../models/index').sequelize;
const messages = require("../middlewares/error-message");
const _ = require('lodash');

async function createAssetCategory(postData) {
    try {
        const excuteMethod = _.mapKeys(postData, (value, key) => _.snakeCase(key))
        const assetCategory = await sequelize.models.asset_category.create(excuteMethod);
        const req = {
            assetCategoryId: assetCategory.id
        }
        return await getAssetCategory(req);
    } catch (error) {
        console.error(error);
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function getAssetCategory(query) {
    try {
        let iql = {};
        if (query && Object.keys(query).length) {
            if (query.assetCategoryId) {
                iql.id = query.assetCategoryId;
            }
            if (query.isActive) {
                iql.is_active = query.isActive;
            }
        }
        const employee = await sequelize.models.asset_category.findAll({
            attributes: [['id', 'assetCategoryId'], ['asset_category_name', 'assetCategoryName'],
            ['is_active', 'isActive'],['createdAt', 'createdAt']],
            where: iql,
        });
        return employee;
    } catch (error) {
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function updateAssetCategory(assetCategoryId, putData) {
    try {
        const excuteMethod = _.mapKeys(putData, (value, key) => _.snakeCase(key))
        const employee = await sequelize.models.asset_category.update(excuteMethod, { where: { id: assetCategoryId } });
        const req = {
            assetCategoryId: assetCategoryId
        }
        return await getAssetCategory(req);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAssetCategory,
    getAssetCategory,
    updateAssetCategory
};
