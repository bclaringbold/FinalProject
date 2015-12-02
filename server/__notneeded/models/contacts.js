// Import mongoose and bcrypt

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our contacts Schema
var ContactSchema = new Schema({
	email: String,
	displayName: String,
	contactNumber: String,
	salt: String,
	created: Number,
	updated: Number
}, {
	collection: 'contactInfo'
});

// Generate a Hash
ContactSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);	

};

//check to see if password is valid
ContactSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('contacts', ContactSchema);