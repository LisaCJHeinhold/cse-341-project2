const express = require('express');
const app = express();
const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAllEmployees = async (req, res) => {
    //#swagger.tags=['Employees']
    const result = await mongodb.getDatabase().db().collection('employees').find();
    result.toArray().then((employees) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(employees);
    });
};

const getOneEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').find({ _id: employeeId });
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees[0]);
    });
};

const createEmployee = async (req, res, next) => {
    //#swagger.tags=['Employees']
    try {
        const employee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            position: req.body.position,
            salary: req.body.salary,
            hireDate: req.body.hireDate,
            departmentId: req.body.departmentId
        };
        const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the new employee');
        }
    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    try {
        const employeeId = new ObjectId(req.params.id);
        const employee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            position: req.body.position,
            salary: req.body.salary,
            hireDate: req.body.hireDate,
            departmentId: req.body.departmentId
        };
        const response = await mongodb.getDatabase().db().collection('employees').replaceOne({ _id: employeeId }, employee);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the employee.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

const deleteEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    try {
        const employeeId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: employeeId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while deleting the employee.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json('Internal Server Error');
});

module.exports = {
    getAllEmployees,
    getOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}