const { DbConnection } = require('../lib/DbConnection');

const DatabaseService = ({ logger }) => {
    const dbConnection = DbConnection({ logger });
    const application = dbConnection.initDb();

    const addApplication = ({
        applicant_first_name, applicant_last_name, loan_amount, lender_id, assets, liabilities,
    }) => {
        try {
            const newApplication = application.insert({
                applicant_first_name,
                applicant_last_name,
                loan_amount,
                lender_id,
                assets,
                liabilities,
                is_deleted: 0,
            });

            logger.info('Added an application into the database');
            return newApplication;
        } catch (err) {
            logger.error('Error while adding an application into the database');
            throw new Error('Error while adding an application into the database');
        }
    };

    const deleteApplication = ({ id }) => {
        const applicationToDelete = application.findOne({
            $and:
            [{ id: { $aeq: id } }, { is_deleted: { $eq: 0 } }],
        });
        if (applicationToDelete !== null) {
            applicationToDelete.is_deleted = 1;
            logger.info('Soft deleted an application in the database');
            return true;
        }
        logger.info('Application not found while soft deleting');
        return false;
    };

    const retrieveAllApplications = () => application.find({ is_deleted: { $aeq: 0 } })
        .map((obj) => ({
            id: obj.id,
            applicant_first_name: obj.applicant_first_name,
            applicant_last_name: obj.applicant_last_name,
            loan_amount: obj.loan_amount,
            lender_id: obj.lender_id,
            assets: obj.assets,
            liabilities: obj.liabilities,
        }));

    const retrieveApplication = ({ id }) => {
        const retrievedApplication = application.findOne({
            $and:
        [{ id: { $aeq: id } }, { is_deleted: { $eq: 0 } }],
        });

        if (retrievedApplication !== null) {
            return retrievedApplication;
        }
        return false;
    };

    const updateApplication = ({ id }, updatedApplication) => {
        let applicationToUpdate = application.findOne({ id: { $aeq: id } });
        if (applicationToUpdate !== null) {
            applicationToUpdate = { ...applicationToUpdate, ...updatedApplication };
            application.update(applicationToUpdate);
            logger.info('Updated the application in the database');
            return applicationToUpdate;
        }
        logger.info('Wrong application id entered for updation ');
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
    DatabaseService,
};
