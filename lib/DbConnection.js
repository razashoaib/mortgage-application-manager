const Loki = require('lokijs');
const config = require('./config');

const DbConnection = ({ logger }) => {
    const db = new Loki(config.DB_NAME);

    const initDb = () => {
        try {
            let applications = db.getCollection(config.DB_COLLECTION_MAIN);

            if (!applications) {
                applications = db.addCollection(config.DB_COLLECTION_MAIN, { autosave: true });
                logger.info(`Added a new collection ${config.DB_COLLECTION_MAIN} in the db`);
            } else {
                logger.info(`Found an existing collection ${config.DB_COLLECTION_MAIN} in the db`);
            }
            applications.on('insert', (input) => { input.id = input.$loki; });

            return applications;
        } catch (err) {
            logger.error('Database failed to connect');
            throw new Error('Database failed to connect');
        }
    };

    return { initDb };
};

module.exports = {
    DbConnection,
};
