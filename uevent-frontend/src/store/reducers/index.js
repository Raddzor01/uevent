import { combineReducers } from 'redux';
import authReducer from './auth';
import companyReducer from './company';
import userReducer from './user';
import eventReducer from './events';

const rootReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
    user: userReducer,
    event: eventReducer,
});

export default rootReducer;
