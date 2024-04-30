const initialState = {
    comments_users: [],
    ticket_events: [],
    message: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMMENTS_USERS':
            return { ...state, comments_users: action.payload };
        case 'SET_TICKET_EVENTS':
            return { ...state, ticket_events: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default userReducer;
