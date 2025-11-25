const {body, validationResult } = require('express-validator')

const employeeValidationRules = [
    body('name')
    .trim() //Remove spaces in beginning as well as end
    .notEmpty().withMessage('Name is required')
    .isLength({min:2}).withMessage('Name must be at least 2 characters'),
    body('department')
    .trim()
    .notEmpty().withMessage('Department is required')
    .isLength({min:2}).withMessage('Department must be at least 2 characters')
]

function validate(req,res,next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const err = new Error('Validation failed')
        err.status = 400
        err.details = errors.array()
        return next(err)
    }
    next()
}

module.exports = {
    employeeValidationRules,
    validate
}