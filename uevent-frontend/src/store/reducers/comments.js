const initialState = {
    comments: [],
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
        case 'DELETE_COMMENT':
            const updatedCommentsAfterDelete = state.comments.filter(
                (comment) => comment.id !== action.payload,
            );
            return { ...state, comments: updatedCommentsAfterDelete };
        case 'UPDATE_COMMENT':
            const updatedCommentsAfterUpdate = state.comments.map((comment) => {
                if (comment.id === action.payload.id) {
                    return { ...comment, content: action.payload.content };
                }
                return comment;
            });
            return { ...state, comments: updatedCommentsAfterUpdate };
        default:
            return state;
    }
};

export default commentReducer;
