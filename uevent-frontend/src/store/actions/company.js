import CompanyService from '../../services/companyService';

export const createCompany =
    (name, email, latitude, longitude) => async (dispatch) => {
        try {
            await CompanyService.create(name, email, latitude, longitude);
            dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
            console.error('Creating company failed', error);
        }
    };

export const getCompany = (id) => async (dispatch) => {
    try {
        const response = await CompanyService.get(id);
        dispatch({ type: 'SET_COMPANY', payload: response.data });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting company failed', error);
    }
};

export const getCompanies = () => async (dispatch) => {
    try {
        const response = await CompanyService.getAll();
        console.log(response.data.calendarsArray);
        dispatch({
            type: 'SET_COMPANIES',
            payload: response.data.calendarsArray,
        });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting companies failed', error);
    }
};

export const getUserCompanies = (userId) => async (dispatch) => {
    try {
        const response = await CompanyService.getAll(userId);
        console.log(response);
        dispatch({
            type: 'SET_USER_COMPANIES',
            payload: response.data.calendarsArray,
        });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting companies failed', error);
    }
};

export const deleteCompany = (id) => async (dispatch) => {
    try {
        await CompanyService.delete(id);
        dispatch({ type: 'SET_COMPANY', payload: null });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Creating company failed', error);
    }
};

export const updateCompany =
    (id, name, email, latitude, longutude) => async (dispatch) => {
        try {
            await CompanyService.update(id, name, email, latitude, longutude);
            dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
            console.error('Creating company failed', error);
        }
    };
