import { combineReducers } from 'redux';
import authReducer from './auth';
import companyReducer from './company';
import userReducer from './user';
import eventReducer from './events';
import themesReducer from './theme';
import formatsReducer from './format';
import commentReducer from './comments';

const rootReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
    user: userReducer,
    event: eventReducer,
    theme: themesReducer,
    format: formatsReducer,
    comment: commentReducer,
});

export default rootReducer;
