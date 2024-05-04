const request = require('supertest');
const expect = require('chai').expect;
const dotenv = require('dotenv');
dotenv.config();

describe('Restfull File share API Tests', () => {
    const baseurl = 'http://localhost:' + process.env.PORT;
    let private_key = '';
    let public_key = '';

    it('should successfully create a ping', (done) => {
        request(baseurl)
            .get('/api/ping')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).to.be.equal('Pong');
                done();
            });
    });

    it('should successfully upload file', (done) => {
        const filePath = `${__dirname}/test.png`;
        request(baseurl)
            .post('/files')
            .attach('file', filePath)
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                private_key = res.body.payload.privateKey;
                public_key = res.body.payload.publicKey;
                done();
            });
    });

    it('should successfully download file with public key', (done) => {
        request(baseurl)
            .get('/files/' + public_key)
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('should successfully delete file with private key', (done) => {
        request(baseurl)
            .delete('/files/' + private_key)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('should not unccessfully delete while unknown private key', (done) => {
        request(baseurl)
            .delete('/files/' + '12121i12i1y2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });
});
