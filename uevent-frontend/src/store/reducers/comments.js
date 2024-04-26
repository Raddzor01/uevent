const initialState = {
    comments: null,
    message: null,
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return { ...state, comments: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default commentReducer;
