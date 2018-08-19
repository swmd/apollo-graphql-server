const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	name: String,
	email: String,
	password: String,
});

const Users = mongoose.model('Users', usersSchema, 'Users');

module.exports = Users;
