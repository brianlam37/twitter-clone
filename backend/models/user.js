const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },

    name: {
        type:String,
        required: true,
        minlength: 3
    },

    passwordHash: String,

    follows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }],

    date: {
        type: Date,
        required: true
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
})

schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash;
	}
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema)