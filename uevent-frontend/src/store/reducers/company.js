const initialState = {
    companies: null,
    message: null,
};

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMPANIES':
            return { ...state, user: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default companyReducer;
