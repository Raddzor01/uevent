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
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Updating company failed', error);
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
