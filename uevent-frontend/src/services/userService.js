import $api from '../http';

export default class UserService {
    static async get(id) {
        return $api.get(`users/${id}`);
    }

    static async updateUserPhoto(file, id) {
        return $api.post(`users/${id}/avatar`, file);
    }
}
