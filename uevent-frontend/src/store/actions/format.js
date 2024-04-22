import FormatService from '../../services/formatService';

export const getFormats = () => async (dispatch) => {
    try {
        const response = await FormatService.getAll();
        dispatch({ type: 'SET_FORMATS', payload: response.data.formats });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting formats failed', error);
    }
};
