import UserService from '../../services/userService';

export const getUser = (id) => async (dispatch) => {
    try {
        const response = await UserService.get(id);
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'User information received successfully',
        });
        return response.data.userData;
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting user failed', error);
    }
};

export const getCommentsUsers = (eventId, comments) => async (dispatch) => {
    try {
        const response = await UserService.getAll(eventId, comments);
        dispatch({
            type: 'SET_COMMENTS_USERS',
            payload: response.data.usersArray,
        });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'List of user comments received successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting user failed', error);
    }
};

export const getEventGuests = (eventId) => async (dispatch) => {
    try {
        const response = await UserService.getEventGuests(eventId);
        dispatch({
            type: 'SET_EVENT_GUESTS',
            payload: response.data.usersArray,
        });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'List of event guests received successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting event guests failed', error);
    }
};

export const getAllTicketEvents = (id) => async (dispatch) => {
    try {
        const response = await UserService.getAllTicketEvents(id);
        dispatch({
            type: 'SET_TICKET_EVENTS',
            payload: response.data.eventsArray,
        });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'List of user comments received successfully',
        });
        return response.data.userData;
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting user failed', error);
    }
};

export const updateUserPhoto = (id, file) => async (dispatch) => {
    try {
        await UserService.updateUserPhoto(file, id);
        const user = await UserService.get(id);
        dispatch({ type: 'SET_USER', payload: user.data.userData });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'User photo updated successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Updating user photo failed', error);
    }
};

export const updateUser = (id, updatedFields) => async (dispatch) => {
    try {
        await UserService.update(id, updatedFields);
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'User information updated successfully',
        });
        const user = await UserService.get(id);
        dispatch({ type: 'SET_USER', payload: user.data.userData });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Updating user information failed', error);
    }
};

export const fetchUserProfile = async (dispatch, id) => {
    try {
        const userData = await dispatch(getUser(id));
        return userData;
    } catch (error) {
        console.error('Getting user failed:', error);
        return null;
    }
};
