import $api from '../http';

export default class UserService {
    static async get(id) {
        return $api.get(`users/${id}`);
    }

    static async getAll(eventId, comments) {
        return $api.get(`users/?eventId=${eventId}&comments=${comments}`);
    }

    static async getEventGuests(eventId) {
        return $api.get(`users/?eventId=${eventId}`);
    }

    static async getAllTicketEvents(id) {
        return $api.get(`users/${id}/tickets`);
    }

    static async updateUserPhoto(file, id) {
        return $api.post(`users/${id}/avatar`, file);
    }

    static async update(id, updatedFields) {
        const { login, password, email, full_name } = updatedFields;
        return $api.put(`users/${id}`, {
            login,
            password,
            email,
            full_name,
        });
    }
}
