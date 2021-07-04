const LENDER_IDS = {
    CMB: 'CMB',
    STG: 'STG',
    NCP: 'NCP',
    NAB: 'NAB',
};
Object.freeze(LENDER_IDS);

module.exports = {
    DB_NAME: 'lendi.db',
    DB_COLLECTION_MAIN: 'applications',
    LENDER_IDS,
};
