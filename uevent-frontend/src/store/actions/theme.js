import ThemeService from '../../services/themeService';

export const getThemes = () => async (dispatch) => {
    try {
        const response = await ThemeService.getAll();
        dispatch({ type: 'SET_THEMES', payload: response.data.themes });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting themes failed', error);
    }
};
