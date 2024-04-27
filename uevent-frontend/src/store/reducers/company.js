const initialState = {
    companies: null,
    user_companies: null,
    events: null,
    message: '',
};

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMPANIES':
            return { ...state, companies: action.payload };
        case 'SET_COMPANIES_EVENTS':
            return { ...state, events: action.payload };
        case 'SET_USER_COMPANIES':
            return { ...state, user_companies: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default companyReducer;
