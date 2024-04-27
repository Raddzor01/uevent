import PromoCodeService from '../../services/promocodeService';

export const createPromoCode =
    (code, discount, event_id) => async (dispatch) => {
        try {
            await PromoCodeService.create(code, discount, event_id);
            const updatedPromoCodes = await PromoCodeService.getAll();
            dispatch({
                type: 'SET_PROMOCODES',
                payload: updatedPromoCodes.data.promoCodesArray,
            });
            dispatch({
                type: 'SET_MESSAGE',
                payload: 'PromoCode created successfully',
            });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: error.response.data.message,
            });
            console.error('Creating PromoCode failed', error);
        }
    };

export const getPromoCodes = (eventId) => async (dispatch) => {
    try {
        const response = await PromoCodeService.getAll(eventId);
        dispatch({
            type: 'SET_PROMOCODES',
            payload: response.data.promoCodesArray,
        });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'List of PromoCodes received successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting PromoCodes failed', error);
    }
};

export const deletePromoCode = (id) => async (dispatch) => {
    try {
        await PromoCodeService.delete(id);
        dispatch({ type: 'DELETE_PROMOCODE', payload: id });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'Promocode deleted successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Creating promocode failed', error);
    }
};

export const updateComment = (id, updatedFields) => async (dispatch) => {
    try {
        await PromoCodeService.update(id, updatedFields);
        dispatch({ type: 'UPDATE_PROMOCODE', payload: { id, updatedFields } });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'Comment updated successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Updating company failed', error);
    }
};
