const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employees');
const { employeeValidationRules, validate } = require('../validator');
const { isAuthenticated } = require("../authenticate");

router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getOneEmployee);
router.post('/', isAuthenticated, employeeValidationRules(), employeeController.createEmployee);
router.put('/:id',isAuthenticated,  employeeValidationRules(), employeeController.updateEmployee);
router.delete('/:id', isAuthenticated, employeeController.deleteEmployee);

module.exports = router;