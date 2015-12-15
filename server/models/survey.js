
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
	questions: String,
	question01: String,
	question02: String,
	question03: String,
	question04: String,
	question05: String,
	question06: String,
	question07: String,
	question08: String,
	question09: String,
	question10: String,
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
	updated: {type:Date, default: Date.Now},
	created: {type:Date},
	startdate: {type: Date},
	expirydate: {type: Date} 
}, {
	collection: 'survey'
});

module.exports = mongoose.model('survey', surveySchema);