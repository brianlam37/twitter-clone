import tweetService from '../services/tweets';

export const create = tweet => {
	return async dispatch => {
		const newTweet = await tweetService.create(tweet);
		dispatch({
			type: 'CREATE',
			tweet:newTweet
		});
	};
};
export const initTweet = () => {
	return async dispatch => {
		const tweets = await tweetService.getAll();
		dispatch({
			type: 'INIT',
			tweets
		});
	};
};
// export const remove = blog => {

// 	return async dispatch => {
// 		await blogService.remove(blog.id);
// 		dispatch({
// 			type: 'REMOVE',
// 			blog
// 		});
// 	};
// };

export const like = (id, tweet) => {
	return async dispatch => {
		const updatedTweet = await tweetService.update(id, tweet);
		dispatch({
			type: 'LIKE',
			tweet: updatedTweet
		});
	};
};

export const reply = (tweet, reply) => {
	return async dispatch => {
		const result = await tweetService.reply(tweet.id, reply);
		dispatch({
			type: 'REPLY',
			tweet,
			reply:result
		});
	};
};

const reducer = (state = [], action) => {
	let copy = [...state];
	switch(action.type){
		case 'LIKE':{
            const newTweet = {
                ...action.tweet, 
                published: new Date(action.tweet.published)
            }
			let target = copy.findIndex(tweet => tweet.id === action.tweet.id);
			if(target > -1){
				copy[target] = newTweet;
			}
			return copy.sort((a,b) => b.published-a.published);
		}
		case 'CREATE':{            
            const newTweet = {
                ...action.tweet, 
                published: new Date(action.tweet.published)
            }
			return copy.concat(newTweet).sort((a,b) => b.published-a.published);
		}
		case 'INIT':{
			return action.tweets.map(tweet => {
                return {
                    ...tweet, 
                    published: new Date(tweet.published)}
            }).sort((a,b) => b.published-a.published);
		}
		// case 'REMOVE':{
		// 	return copy.filter(blog => {
		// 		return action.blog.id !== blog.id;
		// 	}).sort((a, b) => b.votes - a.votes);
		// }
		case 'REPLY':{
			const newReplies = action.tweet.replies.concat(action.reply);
			const newTweet = {...action.tweet, replies: newReplies};
			let target = copy.findIndex(tweet => tweet.id === action.tweet.id);
			if(target > -1){
				copy[target] = newTweet;
			}
			return copy.sort((a,b) => b.published-a.published);
		}
		default:
			return copy
	}
};

export default reducer;