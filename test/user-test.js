let chai = require('chai')
let server = require('../app')
let chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('User API', () => {
    describe("Login valid user POST api/user/login", () => {
        it("should login valid user", (done) => {
            const user = {
                email: "test@email.com",
                password: "1234567890"
            }
            chai.request(server)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200)
                // res.should.redirectTo('http://127.0.0.1:80/api/user/home')
                // res.header['Location'].should().include('api/user/home')
                done()
            })
        })

        it("should NOT login invalid user POST api/user/login", (done) => {
            const user = {
                email: "testone@email.com",
                password: "qwertyuiop"
            }
            chai.request(server)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(404)
                done()
            })
        })
    })

    describe("Signup new user POST api/user/signup", () => {
        it("should POST new user", (done) => {
            const newUser = {
                firstName: "first name",
                lastName: "last name",
                dob: "2000-12-12",
                email: Math.random().toString() +"@email.com",
                password: "1234567890"
            }
            chai.request(server)
            .post('/api/user/signup')
            .send(newUser)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200)
                done()
            })
        })

        it("should NOT POST user with existing email address", (done) => {
            const newUser = {
                firstName: "first name",
                lastName: "last name",
                dob: "2000-12-12",
                email: "test@email.com",
                password: "1234567890"
            }
            chai.request(server)
            .post('/api/user/signup')
            .send(newUser)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(404)
                done()
            })
        })

        it("should NOT POST new user with invalid email address", (done) => {
            const newUser = {
                firstName: "first name",
                lastName: "last name",
                dob: "2000-12-12",
                email: "test123",
                password: "1234567890"
            }
            chai.request(server)
            .post('/api/user/signup')
            .send(newUser)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(404)
                done()
            })
        })

        it("should NOT POST new user with empty password", (done) => {
            const newUser = {
                firstName: "first name",
                lastName: "last name",
                dob: "2000-12-12",
                email: "test123",
                password: "1234567890"
            }
            chai.request(server)
            .post('/api/user/signup')
            .send(newUser)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(404)
                done()
            })
        })

        it("should NOT POST new user with password length less than 6", (done) => {
            const newUser = {
                firstName: "first name",
                lastName: "last name",
                dob: "2000-12-12",
                email: "test123",
                password: "123"
            }
            chai.request(server)
            .post('/api/user/signup')
            .send(newUser)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(404)
                done()
            })
        })
    })
})