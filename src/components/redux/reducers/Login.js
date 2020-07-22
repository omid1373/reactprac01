import * as act from '../actions';

const initState = {
    auth : false,
}
const auth = (state = initState , action) => {
    console.log(state , action);
    switch (action.type) {
        case act.LOGIN:
            console.log('Login Entered')
            return { ...state, auth: true }
        case act.LOGOUT:
            console.log('Logout Entered')
            return {...state , auth: false }
        default:
            return state;
    }
}
export {act};
export default auth;