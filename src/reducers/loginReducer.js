import loginService from '../services/login';
import tweetService from '../services/tweets';
import userService from '../services/users'
export const login = loginInfo => {
	return async dispatch => {
        const user = await loginService.login(loginInfo);
        const userInfo = await userService.get(user.id);
		dispatch({
			type: 'LOGIN',
            user,
            userInfo
		});
	};
};
export const getLoggedIn = () => {
	return async dispatch =>  {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        let user;
        let userInfo;
        if (loggedUserJSON) {
            user = JSON.parse(loggedUserJSON);
            tweetService.setToken(user.token);
            userInfo = await userService.get(user.id);
        }
        dispatch({
        type: 'GET_LOGGED_IN',
            user,
            userInfo
        })
	};
};
export const logout = () => {
	return {
		type: 'LOGOUT',
	};
};
const reducer = (state = null, action) => {
	switch(action.type){
		case 'LOGIN':{
			window.localStorage.setItem('loggedUser', JSON.stringify(action.user));
            tweetService.setToken(action.user.token);
			return {...action.userInfo, token: action.user.token};
		}
		case 'GET_LOGGED_IN':{
            if(action.user){
                return {...action.userInfo, token: action.user.token}
            }
			return state;
		}
		case 'LOGOUT':{
            window.localStorage.removeItem('loggedUser');
			return null;
		}
		default:
			return state;
	}
};

export default reducer;