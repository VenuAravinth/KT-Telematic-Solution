"use strict";

const sequelize = require('../models/index').sequelize;
const messages = require("../middlewares/error-message");
const _ = require('lodash');

async function createEmployee(postData) {
    try {
        let employee = []
        const findCode = await sequelize.models.employee.findAll({
            attributes: [
                ['id', 'employeeId'],
                ['employee_code', 'employeeCode']
            ],
            limit: 1,
            order: [['id', 'DESC']]
        }).then(result => {
            const format = `EMP-`
            if (result.length > 0) {
                const count = result[0].dataValues.employeeCode.replace('EMP-', '')
                postData.employeeCode = `${format}${(parseInt(count)+ 1).toString().padStart(5, '0')}`
            } else {
                postData.employeeCode = `${format}00001`
            }
        }).catch(err =>{
            throw err;
        })

        const excuteMethod = _.mapKeys(postData, (value, key) => _.snakeCase(key))
        employee = await sequelize.models.employee.create(excuteMethod);
        const req = {
            employeeId: employee.id
        }
        return await getEmployee(req);
    } catch (error) {
        console.error(error);
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function getEmployee(query) {
    try {
        let iql = {};
        if (query && Object.keys(query).length) {
            if (query.employeeId) {
                iql.id = query.employeeId;
            }
            if (query.isActive) {
                iql.is_active = query.isActive;
            }
        }
        const employee = await sequelize.models.employee.findAll({
            attributes: [['id', 'employeeId'], ['employee_name', 'employeeName'],
            ['contact_no', 'contactNo'], ['email', 'email'], ['employee_code', 'employeeCode'],
            ['address', 'address'],['is_active', 'isActive'], ['createdAt', 'createdAt']],
            where: iql,
        });
        return employee;
    } catch (error) {
        throw new Error(messages.OPERATION_ERROR);
    }
}

async function updateEmployee(employeeId, putData) {
    try {
        const excuteMethod = _.mapKeys(putData, (value, key) => _.snakeCase(key))
        const employee = await sequelize.models.employee.update(excuteMethod, { where: { id: employeeId } });
        const req = {
            employeeId: employeeId
        }
        return await getEmployee(req);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createEmployee,
    getEmployee,
    updateEmployee
};
