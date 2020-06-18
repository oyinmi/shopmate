// User controller: All business logic goes here


/* jshint esversion: 6 */

const User = require('../models/user_model');
const bcrypt = require('bcrypt');

   // To Create A User  
exports.create = (req, res) => {

      // validation request
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Requred field can not be empty",
        });
    }

      // Create a user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });

      // Save user to database  
    user
       .save()
       .then((data) => {
           res.send(data);
       })
      .catch((err) => {
           res.status(500).send({
               message: err.message || "Error occured while creating the user.",
           });
       });
};  

   // Finding all users
exports.findAll = (req, res) => {
    User.find()
       .sort({ name: 1 })
       .then((users) => {
           res.status(200).send(users);
       })
       .catch((err) => {
           res.status(500).send({
               message: err.message || "Error Occured",
           });
       });
};

   // Finding one users
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id,
            });
        }
        res.status(200).send(user);
        console.log(user);
    })
    .catch((err) => {
        return res.status(500).send({
            message: "Error retrieving user with id " + req.param.id,
        });
    });
};

    // Deleting a user
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found",
                });
            }
            res.send({ message: "User deleted successfully!"});
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Could not delete user",
            });
        });
};

   // Updating a user
exports.UpdateUser = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({
            message:"reqired fields cannot be empty",
        });
    }
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
       .then((user) => {
           if (!user) {
               return res.status(404).send({
                   message: "no user found",
               });
           }
           res.status(200).send(user);
       })
       .catch((err) => {
           return res.status(404).send({
               message: "error while updating the post"
           });
       });
}; 