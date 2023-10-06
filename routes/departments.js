const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departments');
const { departmentValidationRules, validate } = require('../validator');
const { isAuthenticated } = require("../authenticate");

router.get('/', departmentsController.getAllDepartments);
router.get('/:id', departmentsController.getOneDepartment);
router.post('/', isAuthenticated, departmentValidationRules(), departmentsController.createDepartment);
router.put('/:id', isAuthenticated, departmentValidationRules(), departmentsController.updateDepartment);
router.delete('/:id', isAuthenticated, departmentsController.deleteDepartment);

module.exports = router;