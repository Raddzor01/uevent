const initialState = {
    message: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default userReducer;
