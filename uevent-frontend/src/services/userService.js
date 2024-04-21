import $api from '../http';

export default class UserService {
    static async get(id) {
        return $api.get(`users/${id}`);
    }

    static async updateUserPhoto() {
        return $api.post(`users/photo`);
    }
}
