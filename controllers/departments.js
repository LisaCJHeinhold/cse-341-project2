const express = require('express');
const app = express();
const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAllDepartments = async (req, res) => {
    //#swagger.tags=['Departments']
    const result = await mongodb.getDatabase().db().collection('departments').find();
    result.toArray().then((departments) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(departments);
    });
};

const getOneDepartment = async (req, res) => {
    //#swagger.tags=['Departments']
    const departmentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('departments').find({ _id: departmentId });
    result.toArray().then((departments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(departments[0]);
    });
};

const createDepartment = async (req, res, next) => {
    //#swagger.tags=['Departments']
    try {
        const department = {
            departmentName: req.body.departmentName,
            budget: req.body.budget,
            location: req.body.location
        };
        const response = await mongodb.getDatabase().db().collection('departments').insertOne(department);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the new department');
        }
    } catch (error) {
        next(error);
    }
};

const updateDepartment = async (req, res) => {
    //#swagger.tags=['Departments']
    try {
        const departmentId = new ObjectId(req.params.id);
        const department = {
            departmentName: req.body.departmentName,
            budget: req.body.budget,
            location: req.body.location
        };
        const response = await mongodb.getDatabase().db().collection('departments').replaceOne({ _id: departmentId }, department);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the department.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

const deleteDepartment = async (req, res) => {
    //#swagger.tags=['Departments']
    try {
        const departmentId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('departments').deleteOne({ _id: departmentId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while deleting the department.');
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
    getAllDepartments,
    getOneDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
}