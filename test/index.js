//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../controllers/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

//mongoose.connection.db.dropDatabase();
chai.use(chaiHttp);
  /*
   * Test the /POST route
   */
 describe('/GET users', () => {
     it('Obtiene todos los usuarios y el resultado es cero', (done) => {
       chai.request(server)
           .get('/api/users')
           //.send(book)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(0);
             done();
           });
     });
 });
 describe('/POST users', () => {
     it('Se ingresa un usuario', (done) => {
       let user = {
           name: "Rodrigo Spirolazzi",
           email: "rspirolazzi@gmail.com",
           username: "rspirolazzi",
           genre: "Male",
           age: 36
       }
       chai.request(server)
           .post('/api/users')
           .send(user)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.not.have.property('errors');
               res.body.should.have.property('_id');
             done();
           });
     });
 });
 describe('/GET almost one users', () => {
     it('Obtiene todos los usuarios y el resultado es 1', (done) => {
       /*let book = {
           title: "The Lord of the Rings",
           author: "J.R.R. Tolkien",
           year: 1954
       }*/
       chai.request(server)
           .get('/api/users')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.greaterThan(0);
             done();
           });
     });
 });
 describe('/PUT users', () => {
     it('Se edita el primero usuario', (done) => {
       var UserModel = mongoose.model('User');
       UserModel.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, user) {
          user.name='UPDATED NAME';
          chai.request(server)
              .put('/api/users/'+user._id)
              .send(user)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.not.have.property('errors');
                  res.body.should.have.property('_id');
                  res.body.name.should.equal('UPDATED NAME');
                done();
              });
        });
     });
 });
 describe('/POST users', () => {
     it('Se ingresa un nuevo usuario', (done) => {
       let user = {
           name: "Leandro Spirolazzi",
           email: "lspirolazzi@gmail.com",
           username: "lspirolazzi",
           genre: "Male",
           age: 32
       }
       chai.request(server)
           .post('/api/users')
           .send(user)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.not.have.property('errors');
               res.body.should.have.property('_id');
               res.body.name.should.equal('Leandro Spirolazzi');
             done();
           });
     });
 });
 /*describe('/DELETE users', () => {
     it('Se borra un usuario', (done) => {
       var UserModel = mongoose.model('User');
       UserModel.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, user) {
          chai.request(server)
              .delete('/api/users/'+user._id)
              .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body);
                done();
              });
        });
     });
 });*/

 /*after(function (done) {
         console.log('Deleting test database');
         mongoose.connection.db.dropDatabase(done);
 });*/
 before(function (done) {
          //console.log('Deleting test database');
         //mongoose.connection.db.dropDatabase(done);
         mongoose.connection.once('connected', () => {
            mongoose.connection.db.dropDatabase(done);
        });
 })
