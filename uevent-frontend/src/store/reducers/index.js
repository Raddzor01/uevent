import { combineReducers } from 'redux';
import authReducer from './auth';
import companyReducer from './company';
import userReducer from './user';
import eventReducer from './events';
import themesReducer from './theme';
import formatsReducer from './format';

const rootReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
    user: userReducer,
    event: eventReducer,
    theme: themesReducer,
    format: formatsReducer,
});

export default rootReducer;
