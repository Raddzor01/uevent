import $api from '../http';

export default class EventService {
    static async create(
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
    ) {
        return $api.post('events/', {
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
        });
    }

    static async get(id) {
        return $api.get(`events/${id}`);
    }

    static async getAll() {
        return $api.get('events/');
    }

    static async delete(id) {
        return $api.delete(`events/${id}`);
    }

    static async update(
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
    ) {
        return $api.put(`events/${id}`, {
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
        });
    }
}
