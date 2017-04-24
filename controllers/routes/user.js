var mongoose = require('mongoose');
var User  = mongoose.model('User');

class UsersController{
    //GET - Return all users in the DB
    findAllUsers(req, res) {
        User.find(function(err, users) {
            if(err) res.send(500, err.message);

            console.log('GET /users')
            res.status(200).jsonp(users);
        });
    };

    //GET - Return a User with specified ID
    findById(req, res) {
        User.findById(req.params.id, function(err, user) {
            if(err) return res.send(500, err.message);

            console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(user);
        });
    };

    //POST - Insert a new User in the DB
    addUser(req, res) {
        console.log('POST');
        console.log(req.body);

        var user = new User({
            name:    req.body.name,
            age: 	  req.body.age,
            email:  req.body.email,
            username:   req.body.username,
            genre:    req.body.genre,
            bio:  req.body.bio
        });

        user.save(function(err, user) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(user);
        });
    };

    //PUT - Update a register already exists
    updateUser(req, res) {
        User.findById(req.params.id, function(err, user) {
            user.name   = req.body.name;
            user.age    = req.body.age;
            user.email = req.body.email;
            user.username  = req.body.username;
            user.genre   = req.body.genre;
            user.bio = req.body.bio;

            user.save(function(err) {
                if(err) return res.send(500, err.message);
                res.status(200).jsonp(user);
            });
        });
    };

    //DELETE - Delete a User with specified ID
    deleteUser(req, res) {
        User.findById(req.params.id, function(err, user) {
            user.remove(function(err) {
                if(err) return res.send(500, err.message);
                res.status(200);
            })
        });
    };
}
module.exports = new UsersController();
