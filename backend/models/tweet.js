const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        minlength: 1
    },
    published: {
        type: Date,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number,
        default:0,
    },
    replies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tweet'
		}
    ],
    retweets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tweet'
		}
    ],
    quotes: [
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tweet'
		}
    ]
})
schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});
module.exports = mongoose.model('Tweet', schema)