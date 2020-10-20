import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import tweetReducer from './reducers/tweetReducer';
import loginReducer from './reducers/loginReducer';

const reducer = combineReducers({
	tweets: tweetReducer,
	// notifications: notificationReducer,
	loggedInUser: loginReducer,
	// users: userReducer
});

const store = createStore(reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);

export default store;