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
                //console.log(res.body);
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
                //console.log(res.body);
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
                //console.log(res.body);
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
                //console.log(res.body);
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('should not Successfully delete while unknown private key', (done) => {
        request(baseurl)
            .delete('/files/' + '9876111221212222222212121i12i1y2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                //console.log(res.body);
                expect(res.statusCode).to.be.equal(500);
                done();
            });
    });

    it('should not Successfully delete while private key length is grater than 32', (done) => {
        request(baseurl)
            .delete('/files/' + '9876111sdsd221212222222212121i12i1y2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                //console.log(res.body);
                expect(res.statusCode).to.be.equal(400);
                expect(res.body.payload.privatekey.msg).to.be.equal(
                    'Maximum character limit is 32'
                );
                done();
            });
    });

    it('should not successfully download file with unknown key', (done) => {
        request(baseurl)
            .get('/files/' + 'public_key')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                //console.log(res.body);
                expect(res.statusCode).to.be.equal(400);
                done();
            });
    });

    it('should not successfully upload file without any file', (done) => {
        const filePath = `${__dirname}/test.png`;
        request(baseurl)
            .post('/files')
            .end(function (err, res) {
                //console.log(res.body);
                expect(res.statusCode).to.be.equal(500);
                done();
            });
    });
});
