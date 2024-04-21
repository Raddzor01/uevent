import UserService from '../../services/userService';

export const getUser = (id) => async (dispatch) => {
    try {
        const response = await UserService.get(id);
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
        return response.data.userData;
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting user failed', error);
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
