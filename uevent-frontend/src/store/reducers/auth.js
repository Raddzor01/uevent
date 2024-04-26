const initialState = {
    user: null,
    message: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_AVATAR':
            return {
                ...state,
                user: { ...state.user, picture: action.payload },
            };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default authReducer;
