const express = require('express');
// create a stdout console logger
const logger = require('simple-node-logger').createSimpleLogger();

const { userValidationRules, validate } = require('../lib/applicationValidator');

const { DatabaseService } = require('../services/DatabaseService');
const { LoanApplicationRoutes } = require('./LoanApplicationRoutes');

const loanAppRoutes = LoanApplicationRoutes({
    databaseService: DatabaseService({ logger }),
    logger,
});

const router = express.Router();

// GET all applications that have not been deleted
router.get('/', (req, res) => {
    res.json(loanAppRoutes.retrieveAllApplications());
});

// GET application details using an application id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const retrievedApplication = loanAppRoutes.retrieveApplication({ id });

    if (retrievedApplication) {
        return res.json(retrievedApplication);
    }

    return res.status(404).json({ status: 'not found', message: 'Not found, please enter the correct application id' });
});

// DELETE soft delete an application using application id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const isDeleted = loanAppRoutes.deleteApplication({ id });
    if (isDeleted) {
        return res.json({ status: 'success', message: `Successfully deleted the application having id ${id}` });
    }
    return res.status(404).json({ status: 'not found', message: 'Not found, please enter the correct application id' });
});

// POST add a new application
router.post('/', userValidationRules(), validate, (req, res) => {
    const {
        applicant_first_name,
        applicant_last_name,
        loan_amount,
        lender_id,
        assets,
        liabilities,
    } = req.body;

    res.json(loanAppRoutes.addApplication({
        applicant_first_name,
        applicant_last_name,
        loan_amount,
        lender_id,
        assets,
        liabilities,
    }));
});

// PUT update an existing application
router.put('/:id', userValidationRules(), validate, (req, res) => {
    const { id } = req.params;
    const {
        applicant_first_name,
        applicant_last_name,
        loan_amount,
        lender_id,
        assets,
        liabilities,
    } = req.body;

    const updatedApplication = loanAppRoutes.updateApplication({ id }, {
        applicant_first_name,
        applicant_last_name,
        loan_amount,
        lender_id,
        assets,
        liabilities,
    });

    if (updatedApplication) {
        return res.json(updatedApplication);
    }

    return res.status(404).json({ status: 'not found', message: 'Not found, please enter the correct application id' });
});

module.exports = router;
