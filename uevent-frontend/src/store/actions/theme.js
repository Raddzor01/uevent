import ThemeService from '../../services/themeService';

export const getThemes = () => async (dispatch) => {
    try {
        const response = await ThemeService.getAll();
        dispatch({ type: 'SET_THEMES', payload: response.data.themes });
        dispatch({ type: 'SET_MESSAGE', payload: 'List of themes received successfully' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting themes failed', error);
    }
};
