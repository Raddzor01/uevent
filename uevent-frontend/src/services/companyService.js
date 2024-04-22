import $api from '../http';

export default class CompanyService {
    static async create(name, email, latitude, longitude) {
        return $api.post('companies/', { name, email, latitude, longitude });
    }

    static async get(id) {
        return $api.get(`companies/${id}`);
    }

    static async getAll(userId) {
        if (userId) {
            return $api.get(`companies/${userId}`);
        } else {
            return $api.get('companies/');
        }
    }

    static async delete(id) {
        return $api.delete(`companies/${id}`);
    }

    static async update(id, name, email, latitude, longitude) {
        return $api.put(`companies/${id}`, {
            name,
            email,
            latitude,
            longitude,
        });
    }
}
