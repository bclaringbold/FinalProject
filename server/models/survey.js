
// Import mongoose and bcrypt
var mongoose = require('mongoose');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define the Survey Schema
var surveySchema = new Schema({
	name: String,
	completed: Boolean,
	username: String,
	note: String,
	salt: String,
	updated: {type:Date, default: Date.Now}
}, {
	collection: 'survey'
});

module.exports = mongoose.model('survey', surveySchema);