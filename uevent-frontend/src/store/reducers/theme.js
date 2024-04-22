const initialState = {
    themes: null,
    message: null,
};

const themesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THEMES':
            return { ...state, themes: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default themesReducer;
