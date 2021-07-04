const { body, check, validationResult } = require('express-validator');
const { LENDER_IDS } = require('./config');

const userValidationRules = () => [
    body('applicant_first_name').notEmpty().withMessage('must not be empty'),
    body('applicant_last_name').notEmpty().withMessage('must not be empty'),
    body('loan_amount').isInt().toInt().withMessage('must be numeric'),
    check('lender_id').toUpperCase()
        .isIn([LENDER_IDS.STG, LENDER_IDS.CMB, LENDER_IDS.NAB, LENDER_IDS.NCP])
        .withMessage('must be one of STG, CMB, NAB or NCP'),
    body('assets').isArray().withMessage('must be an array of objects'),
    body('liabilities').isArray().withMessage('must be an array of objects'),
    body('assets.*.name').not().isEmpty().withMessage('must not be empty'),
    body('liabilities.*.name').not().isEmpty().withMessage('must not be empty'),
    body('assets.*.value').isInt().toInt().withMessage('must be numeric'),
    body('liabilities.*.value').isInt().toInt().withMessage('must be numeric'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    userValidationRules,
    validate,
};
