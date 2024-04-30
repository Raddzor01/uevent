const initialState = {
    companies: [],
    user_companies: [],
    events: [],
    subscriptions: [],
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
        case 'UPDATE_USER_COMPANY':
            const updatedUserCompanies = state.user_companies.map((company) => {
                if (company.id === action.payload.companyId) {
                    return { ...company, ...action.payload.companyData };
                }
                return company;
            });
            return { ...state, user_companies: updatedUserCompanies };
        case 'SET_SUBSCRIPTIONS':
            return { ...state, subscriptions: action.payload };
        default:
            return state;
    }
};

export default companyReducer;
