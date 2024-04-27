import AuthService from '../../services/authService.js';

export const login = (login, password) => async (dispatch) => {
    try {
        const response = await AuthService.login(login, password);
        dispatch({ type: 'SET_USER', payload: response.data });
        dispatch({ type: 'SET_MESSAGE', payload: 'Login success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Login failed', error);
    }
};

export const registration =
    (email, password, login, full_name) => async (dispatch) => {
        try {
            const response = await AuthService.register(
                email,
                password,
                login,
                full_name,
            );
            console.log(response);
            dispatch({ type: 'SET_MESSAGE', payload: 'registration success' });
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
            console.error('Register failed', error);
        }
    };

export const logout = () => async (dispatch) => {
    try {
        await AuthService.logout();
        localStorage.removeItem('token');
        dispatch({ type: 'SET_USER', payload: null });
        dispatch({ type: 'SET_MESSAGE', payload: 'Logout success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Logout error', error);
    }
};

export const setUser = (user) => {
    return { type: 'SET_USER', payload: user };
};
