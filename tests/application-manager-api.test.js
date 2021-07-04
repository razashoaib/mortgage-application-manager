/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

const applicationObject = {
    applicant_first_name: 'Leah',
    applicant_last_name: 'Howard',
    loan_amount: '248000',
    lender_id: 'NAB',
    assets: [
        {
            name: 'home',
            value: '232323',
        },
        {
            name: 'car',
            value: 50000,
        },
    ],
    liabilities: [
        {
            name: 'family',
            value: 500000,
        },
    ],
};

describe('Testing the unconfigured path', () => {
    test('It should response the GET method and return 404', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(404);
    });
});

describe('Testing the path for adding a new application', () => {
    test('It should response the GET method and return a 200 status code', async () => {
        const response = await request(app).post('/applications').send(applicationObject)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
});

describe('Testing the path for retrieving all the applications', () => {
    test('It should response the GET method and return a 200 status code', async () => {
        const response = await request(app).get('/applications');
        expect(response.statusCode).toBe(200);
    });
});

describe('Testing the path for retrieving a single application', () => {
    test('It should response the GET method and return a 404 for an invalid application id', async () => {
        const response = await request(app).get('/applications/1111');
        expect(response.statusCode).toBe(404);
    });
});
