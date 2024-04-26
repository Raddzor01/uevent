import CommentService from '../../services/commentService';

export const createComment =
    (content, user_id, event_id) => async (dispatch) => {
        try {
            await CommentService.create(content, user_id, event_id);
            dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
            console.error('Creating comment failed', error);
        }
    };

export const getComment = (id) => async (dispatch) => {
    try {
        const response = await CommentService.get(id);
        dispatch({ type: 'SET_COMMENT', payload: response.data });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting comment failed', error);
    }
};

export const getComments = (eventId) => async (dispatch) => {
    try {
        const response = await CommentService.getAll(eventId);
        dispatch({
            type: 'SET_COMMENTS',
            payload: response.data.comments,
        });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting comments failed', error);
    }
};

export const deleteComment = (id) => async (dispatch) => {
    try {
        await CommentService.delete(id);
        dispatch({ type: 'SET_COMMENT', payload: null });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Creating company failed', error);
    }
};

export const updateComment = (id, updatedFields) => async (dispatch) => {
    try {
        await CommentService.update(id, updatedFields);
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Updating company failed', error);
    }
};
