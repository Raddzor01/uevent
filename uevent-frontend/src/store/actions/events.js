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
                Number(price),
                tickets_available,
                latitude,
                longitude,
                company_id,
                format_id,
                theme_id,
            );
            dispatch({
                type: 'SET_MESSAGE',
                payload: 'Event created successfully',
            });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: error.response.data.message,
            });
            console.error('Creating Event failed', error);
        }
    };

export const getEvent = (id) => async (dispatch) => {
    try {
        const response = await EventService.get(id);
        dispatch({ type: 'SET_EVENT', payload: response.data.event });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'Event information received successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting event failed', error);
    }
};

export const getEvents = () => async (dispatch) => {
    try {
        const response = await EventService.getAll();
        dispatch({ type: 'SET_EVENTS', payload: response.data.eventsArray });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'List of events received successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting events failed', error);
    }
};

export const getEventsForCompany = (id) => async (dispatch) => {
    try {
        const response = await EventService.getAll(id);
        dispatch({
            type: 'SET_COMPANIES_EVENTS',
            payload: response.data.eventsArray,
        });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'List of company events received successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting events failed', error);
    }
};

export const deleteEvent = (id) => async (dispatch) => {
    try {
        console.log(id);
        await EventService.delete(id);
        dispatch({ type: 'SET_EVENT', payload: null });
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'Event deleted successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Deleting event failed', error);
    }
};

export const updateEvent = (id, updatedFields) => async (dispatch) => {
    try {
        await EventService.update(id, updatedFields);
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'Event updated successfully',
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Updating event failed', error);
    }
};
