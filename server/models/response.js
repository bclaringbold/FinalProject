
// Import mongoose and bcrypt
var mongoose = require('mongoose');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define the Survey Schema
var responseSchema = new Schema({
	name: String,
	surveyid: String,
	questions: String,
	answerq01: String,
	answerq02: String,
	answerq03: String,
	answerq04: String,
	answerq05: String,
	answerq06: String,
	answerq07: String,
	answerq08: String,
	answerq09: String,
	answerq10: String,
	salt: String,
	created: {type:Date, default: Date.Now},
}, {
	collection: 'Response'
});

module.exports = mongoose.model('Response', responseSchema);