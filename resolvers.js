const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./mongo');

const signup = (root, {email, password, name}) => {
  if (!email || !password || !name) {
    throw 'You must send all details.';
	}
	return Users.find({ email: email })
		.then(user => {
			if (user.length > 0) {
        throw 'A user with that username already exists.';
			}
			let passwordHash = bcrypt.hashSync(password.trim(), 12);
			let newUser = { email, name };
			newUser.password = passwordHash;
			return Users.create(newUser);
    })
		.catch(err => {
			throw err;
		});
}

const login = (root, {email, password}) => {
  if (!email || !password) {
    throw 'You must send the username and the password.';
	}
	return Users.findOne({ email: email })
		.then(user => {
			if (!user) {
        throw 'No matching user.';
      }
			return new Promise((res, rej) => {
				bcrypt.compare(password, user.password, (err, success) => {
					if (err) {
            rej('The has been an unexpected error, please try again later');
					}
					if (!success) {
            rej('Your password is incorrect.');
					} else {
            res(user);
					}
				});
			});
		})
		.catch(err => {
			throw err;
		});
}

module.exports = {
  resolvers: {
    Query: {
      feed: () => 'Feed from query'
    },
    Mutation: {
      signup,
      login
    }
  }
};
