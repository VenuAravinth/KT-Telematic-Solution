"use strict";

const sequelize = require('../models/index').sequelize;
const messages = require("../middlewares/error-message");
const _ = require('lodash');

async function createBranch(postData) {
    try {
        const excuteMethod = _.mapKeys(postData, (value, key) => _.snakeCase(key))
        const branch = await sequelize.models.branch.create(excuteMethod);
        const req = {
            branchId: branch.id
        }
        return await getBranch(req);
    } catch (error) {
        console.error(error);
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function getBranch(query) {
    try {
        let iql = {};
        if (query && Object.keys(query).length) {
            if (query.branchId) {
                iql.id = query.branchId;
            }
            if (query.isActive) {
                iql.is_active = query.isActive;
            }
        }
        const employee = await sequelize.models.branch.findAll({
            attributes: [['id', 'branchId'], ['branch_name', 'branchName'],
            ['is_active', 'isActive'],['createdAt', 'createdAt']],
            where: iql,
        });
        return employee;
    } catch (error) {
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function updateBranch(branchId, putData) {
    try {
        const excuteMethod = _.mapKeys(putData, (value, key) => _.snakeCase(key))
        const employee = await sequelize.models.branch.update(excuteMethod, { where: { id: branchId } });
        const req = {
            branchId: branchId
        }
        return await getBranch(req);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createBranch,
    getBranch,
    updateBranch
};
