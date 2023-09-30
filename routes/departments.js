const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departments');
const { departmentValidationRules, validate } = require('../validator');

router.get('/', departmentsController.getAllDepartments);
router.get('/:id', departmentsController.getOneDepartment);
router.post('/', departmentValidationRules(), departmentsController.createDepartment);
router.put('/:id', departmentValidationRules(), departmentsController.updateDepartment);
router.delete('/:id', departmentsController.deleteDepartment);

module.exports = router;