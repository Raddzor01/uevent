import { combineReducers } from 'redux';
import authReducer from './auth';
import companyReducer from './company';
import userReducer from './user';

const rootReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
    user: userReducer,
});

export default rootReducer;
