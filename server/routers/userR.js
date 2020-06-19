const express = require('express')
const router = express.Router()
const db = require('../db')
const user = require('../models/userM')
const {
    request
} = require('express')


/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

let Users = {}

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
            res.redirect('/index.html')
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

                } else {
                    req.session.username = user.username
                    res.redirect('/userscreen.html')
                }
            })
        } else {
            res.json({
                status: 0,
                msg: 'Invalid Fields'
            });
        }
    })

module.exports = function(UserList) {
    Users = UserList
    return router
}