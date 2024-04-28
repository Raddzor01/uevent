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

    static async getAll(companyId) {
        if (companyId) {
            return $api.get(`events/?companyId=${companyId}`);
        } else {
            return $api.get('events/');
        }
    }

    static async delete(eventId) {
        return $api.delete(`events/${eventId}`);
    }

    static async updateEventPhoto(id, file) {
        return $api.post(`events/${id}/avatar`, file);
    }

    static async update(id, updatedFields) {
        const {
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
        } = updatedFields;
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
