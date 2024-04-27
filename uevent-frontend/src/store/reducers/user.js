const initialState = {
    comments_users: null,
    message: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMMENTS_USERS':
            return { ...state, comments_users: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default userReducer;
