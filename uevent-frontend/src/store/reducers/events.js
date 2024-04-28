const initialState = {
    events: null,
    event: null,
    message: '',
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return { ...state, events: action.payload };
        case 'SET_EVENT':
            return { ...state, event: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default eventReducer;
