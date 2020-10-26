const tweetsRouter = require('express').Router();
const User = require('../models/user');
const Tweet = require('../models/tweet');
const jwt = require('jsonwebtoken');

tweetsRouter.get('/', async (request, response) => {
	const tweets = await Tweet.find({})
        .populate('author', {name: 1, username: 1})
        .populate('parent', {name: 1, username: 1})
        .populate({
            path: 'replies',
            populate: { 
                path: 'author mentioned',
                select: {name: 1, username: 1},
                
            },

          })
        .populate('mentioned', {name: 1, username: 1})
        .populate('likes')
	response.json(tweets);
});

tweetsRouter.get('/:id', async (request, response) => {
	const tweet = await Tweet.findById(request.params.id);
	response.json(tweet);
});

tweetsRouter.post('/', async (request, response) => {
    const body = request.body;
    if (!request.token) {
		return response.status(401).json({error: 'token missing'});
    }
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({error: 'token missing or invalid'});
    }
	const user = await User.findById(decodedToken.id);
	const tweet = new Tweet({
		message: body.message,
        author: user._id,
        published: new Date()
    });
	const postedTweet = await tweet.save();
	postedTweet.populate('author', {username: 1, name: 1}).execPopulate();
	user.tweets = user.tweets.concat(postedTweet._id);
	await user.save();
	response.status(201).json(postedTweet);
});

tweetsRouter.post('/:id/reply', async (request, response) => {
	const body = request.body;
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({error: 'token missing or invalid'});
	}
    const tweet = await Tweet.findById(request.params.id);
    const user = await User.findById(decodedToken.id);
	const reply = new Tweet({
		message: body.message,
        author: user._id,
        published: new Date(),
        parent: body.parent,
        mentioned: body.mentioned
    });
    const postedReply= await reply.save();
    postedReply.populate('author', {name: 1, username: 1})
        .populate('parent', {name: 1, username: 1})
        .populate({
            path: 'replies',
            populate: { 
                path: 'author mentioned',
                select: {name: 1, username: 1},
            },
        }).populate('mentioned', {name: 1, username: 1})
        .populate('likes')
        .execPopulate();
	tweet.replies = tweet.replies.concat(postedReply._id);
    await tweet.save();
    user.tweets = user.tweets.concat(postedReply._id);
	await user.save();
	response.status(201).json(postedReply);
});

// tweetsRouter.delete('/:id', async (request, response) => {
// 	const decodedToken = jwt.verify(request.token, process.env.SECRET);
// 	if (!request.token || !decodedToken.id) {
// 		return response.status(401).json({error: 'token missing or invalid'});
// 	}
// 	const user = await User.findById(decodedToken.id);
// 	console.log(user.id);
// 	const blog = await Blog.findById(request.params.id);
// 	console.log(blog.user);
// 	if(blog.user.toString() === user.id.toString()){
// 		await Blog.findByIdAndRemove(request.params.id);
// 		response.status(204).end();
// 	}else{
// 		response.status(401).json({error: 'not your post'});
// 	}


// });

tweetsRouter.put('/:id', async (request, response) => {
	const body = request.body;
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({error: 'token missing or invalid'});
    }
    const user = await User.findById(decodedToken.id);
	const tweet = {
		likes: body.likes
	};
    const putTweet = await Tweet.findByIdAndUpdate(request.params.id, tweet, {new: true})
        .populate('author', {username: 1, name: 1})
        .populate('parent', {name: 1, username: 1})
        .populate({
            path: 'replies',
            populate: { 
                path: 'author mentioned',
                select: {name: 1, username: 1},
                
            },

          })
        .populate('mentioned', {name: 1, username: 1})
        .populate('likes')
    const likedAlready = user.likes.findIndex(id => id.toString() === putTweet._id.toString());
    if(likedAlready > -1){
        user.likes.splice(likedAlready, 1);
    }else{
        user.likes = user.likes.concat(putTweet._id);
    }
	await user.save();
	response.json(putTweet);
});

module.exports = tweetsRouter;

