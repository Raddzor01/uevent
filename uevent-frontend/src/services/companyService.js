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

    static async delete(companyId) {
        return $api.delete(`companies/${companyId}`);
    }

    static async update(id, updatedFields) {
        const { name, email, latitude, longitude } = updatedFields;
        return $api.put(`companies/${id}`, {
            name,
            email,
            latitude,
            longitude,
        });
    }

    static async updateCompanyPhoto(id, file) {
        return $api.post(`companies/${id}/avatar`, file);
    }

    static async subscribeToCompany(id) {
        return $api.post(`companies/subscription/${id}`);
    }

    static async unsubscribeToCompany(id) {
        return $api.delete(`companies/subscription/${id}`);
    }

    static async createStripe(id) {
        return $api.post(`companies/${id}/connect-stripe`);
    }

    static async getStripe(id) {
        return $api.get(`companies/${id}/connect-stripe`);
    }
}

export const getCompanyName = (companyId, companies) => {
    const company =
        companies && companies.find((company) => company.id === companyId);
    return company ? company.name : 'Unknown';
};
