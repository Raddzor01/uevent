import $api from '../http';

export default class UserService {
    static async get(id) {
        return $api.get(`users/${id}`);
    }

    static async getAll(eventId, comments) {
        return $api.get(`users/?eventId=${eventId}&comments=${comments}`);
    }

    static async updateUserPhoto(file, id) {
        return $api.post(`users/${id}/avatar`, file);
    }
}
