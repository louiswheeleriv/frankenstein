var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy(
		{
			passReqToCallback : true
		},
		function(req, username, password, done){
			// Check in mongo if a user with username exists or not
			User.findOne({'username':username},
				function(err, user){
					// In case of error, return using done method
					if(err){
						return done(err);
					}

					// username does not exist
					if(!user){
						console.log('No user found with username ' + username);
						return done(null, false, req.flash('message', 'User not found.'));
					}

					// User exists but wrong password
					if(!isValidPassword(user, password)){
						console.log('Invalid password');
						return done(null, false, req.flash('message', 'Invalid password.'));
					}

					// User and password both match, return user from
					// done method which will be treated like success
					return done(null, user);
				}
			);
		}
	));

	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	}

}

