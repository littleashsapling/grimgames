const express = require('express')
const router = express.Router()
const db = require('../db')
const user = require('../models/userM')


/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

//signup
router.post(
    '/signup',
    async(req, res) => {
        try {
            var username = req.body.username
            var email = req.body.email
            var pass = req.body.password

            var data = {
                'username': username,
                'email': email,
                'password': pass
            }

            new user(data).save()
        } catch (error) {
            console.log('Error while uploading file...Try again later.')
        }
    })

//login
router.post(
    '/login',
    function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        if (email.length > 0 && password.length > 0) {
            user.findOne({
                email: email,
                password: password
            }, function(err, user) {
                if (err) {
                    res.json({
                        status: 0,
                        message: err
                    });
                }
                if (!user) {
                    res.json({
                        status: 0,
                        msg: "not found"
                    });
                }
                res.json({
                    status: 1,
                    id: user._id,
                    message: " success"
                });
            })
        } else {
            res.json({
                status: 0,
                msg: "Invalid Fields"
            });
        }
    })

module.exports = router