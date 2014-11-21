var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done){

		findOrCreateUser = function(){
			// find a user in mongo with username
			User.findOne({'username' : username}, function(err, user){
				// In case of error, return using done method
				if(err){
					console.log('Error in signup: ' + err);
					return done(err);
				}

				// Already exists
				if(user){
					console.log('User already exists with username: ' + username);
					return done(null, false, req.flash('message', 'User already exists.'));
				}else{
					var newUser = new User();
					newUser.username = username;
					newUser.password = createHash(password);
					newUser.email = req.param('email');
					newUser.firstName = req.param('firstName');
					newUser.lastName = req.param('lastName');

					newUser.save(function(err){
						if(err){
							console.log('Error in saving user: ' + err);
							throw err;
						}

						console.log('User registration successful.');
						return done(null, newUser);
					});
				}
			});
		};

		// Delay execution of findOrCreateUser and execute method
		// in next tick of event loop
		process.nextTick(findOrCreateUser);

	})
	);

	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}

}