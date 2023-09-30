const { body, validationResult } = require('express-validator')
const employeeValidationRules = () => {
  return [
    body('firstName', 'Name is requied').not().isEmpty(),
    body('lastName', 'Name is requied').not().isEmpty(),
    body('position', 'Position is requied').not().isEmpty(),
    body('salary', 'Salary is required').not().isEmpty(),
    body('hireDate', 'Hire date is required (YYYY-MM-DD)').isISO8601().toDate(), 
    body('departmentId', 'Department ID is required').not().isEmpty()
  ]
}
const departmentValidationRules = () => {
  return [
    body('departmentName', 'Department name is requied').not().isEmpty(),
    body('budget', 'Budget is requied').not().isEmpty(),
    body('location', 'Location is requied').not().isEmpty()
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
    employeeValidationRules,
    departmentValidationRules,
    validate
}