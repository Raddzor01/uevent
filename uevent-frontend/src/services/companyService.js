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
    
}

export const getCompanyName = (companyId, companies) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : 'Unknown';
};
