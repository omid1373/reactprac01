import { combineReducers } from 'redux';
import auth from './Login';
import exmp from "./exampleReducer";

export default combineReducers({
    Auth : auth,
    Exmp : exmp
})