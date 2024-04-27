const initialState = {
    promocodes: [],
    message: null,
};

const promocodesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROMOCODES':
            return { ...state, promocodes: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CLEAR_MESSAGE':
            return { ...state, message: action.payload };
        case 'DELETE_PROMOCODE':
            const updatedPromocodesAfterDelete = state.promocodes.filter(
                (promocode) => promocode.id !== action.payload,
            );
            return { ...state, promocodes: updatedPromocodesAfterDelete };
        case 'UPDATE_PROMOCODE':
            const updatedPromocodesAfterUpdate = state.promocodes.map(
                (promocode) => {
                    if (promocode.id === action.payload.id) {
                        return {
                            ...promocode,
                            Discount: action.payload.Discount,
                            code: action.payload.code,
                        };
                    }
                    return promocode;
                },
            );
            return { ...state, promocodes: updatedPromocodesAfterUpdate };
        default:
            return state;
    }
};

export default promocodesReducer;
