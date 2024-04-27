import FormatService from '../../services/formatService';

export const getFormats = () => async (dispatch) => {
    try {
        const response = await FormatService.getAll();
        dispatch({ type: 'SET_FORMATS', payload: response.data.formats });
        dispatch({ type: 'SET_MESSAGE', payload: 'List of formats received successfully' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting formats failed', error);
    }
};
