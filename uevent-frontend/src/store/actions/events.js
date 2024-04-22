import EventService from '../../services/eventService';

export const createEvent =
    (
        name,
        description,
        date,
        price,
        tickets_available,
        latitude,
        longitude,
        company_id,
        format_id,
        theme_id,
    ) =>
    async (dispatch) => {
        try {
            await EventService.create(
                name,
                description,
                date,
                price,
                tickets_available,
                latitude,
                longitude,
                company_id,
                format_id,
                theme_id,
            );
            dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
            console.error('Creating Event failed', error);
        }
    };

export const getEvent = (id) => async (dispatch) => {
    try {
        const response = await EventService.get(id);
        dispatch({ type: 'SET_EVENT', payload: response.data.event });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting event failed', error);
    }
};

export const getEvents = () => async (dispatch) => {
    try {
        const response = await EventService.getAll();
        dispatch({ type: 'SET_EVENTS', payload: response.data });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting events failed', error);
    }
};

export const getEventsForCompany = (id) => async (dispatch) => {
    try {
        const response = await EventService.getAll(id);
        dispatch({ type: 'SET_COMPANIES_EVENTS', payload: response.data });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Getting events failed', error);
    }
};

export const deleteEvent = (id) => async (dispatch) => {
    try {
        console.log(id);
        await EventService.delete(id);
        dispatch({ type: 'SET_EVENT', payload: null });
        dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
        console.error('Deleting event failed', error);
    }
};

export const updateEvent =
    (
        name,
        description,
        date,
        price,
        tickets_available,
        latitude,
        longitude,
        company_id,
        format_id,
        theme_id,
    ) =>
    async (dispatch) => {
        try {
            await EventService.update(
                name,
                description,
                date,
                price,
                tickets_available,
                latitude,
                longitude,
                company_id,
                format_id,
                theme_id,
            );
            dispatch({ type: 'SET_MESSAGE', payload: 'Success' });
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: 'Error' });
            console.error('Updating event failed', error);
        }
    };
