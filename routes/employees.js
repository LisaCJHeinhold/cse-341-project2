const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employees');
const { employeeValidationRules, validate } = require('../validator');

router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getOneEmployee);
router.post('/', employeeValidationRules(), employeeController.createEmployee);
router.put('/:id', employeeValidationRules(), employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;