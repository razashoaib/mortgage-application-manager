const _ = require('underscore');

const LoanApplicationRoutes = ({ databaseService, logger }) => {
    const addApplication = ({
        applicant_first_name, applicant_last_name, loan_amount, lender_id, assets, liabilities,
    }) => {
        try {
            const application = databaseService.addApplication({
                applicant_first_name,
                applicant_last_name,
                loan_amount,
                lender_id,
                assets,
                liabilities,
            });

            return _.omit(application, 'is_deleted', '$loki', 'meta');
        } catch (err) {
            logger.error('Failed to add a record in the db');
            throw new Error('Failed to add a record in the db');
        }
    };

    const deleteApplication = ({ id }) => databaseService.deleteApplication({ id });

    const retrieveAllApplications = () => databaseService.retrieveAllApplications();

    const retrieveApplication = ({ id }) => {
        const retrievedApplication = databaseService.retrieveApplication({ id });
        if (retrievedApplication) {
            return _.omit(retrievedApplication, 'is_deleted', '$loki', 'meta');
        }
        return false;
    };

    const updateApplication = ({ id }, updatedApplication) => {
        const updatedApp = databaseService.updateApplication({ id }, updatedApplication);

        if (updatedApp) {
            return _.omit(updatedApp, 'is_deleted', '$loki', 'meta');
        }

        return false;
    };

    return {
        addApplication,
        deleteApplication,
        retrieveAllApplications,
        retrieveApplication,
        updateApplication,
    };
};
module.exports = {
    LoanApplicationRoutes,
};
