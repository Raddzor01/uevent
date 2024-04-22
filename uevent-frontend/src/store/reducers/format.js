const initialState = {
    formats: null,
    message: null,
};

const formatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FORMATS':
            return { ...state, formats: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default formatsReducer;
