import $api from '../http';

export default class PromoCodeService {
    static async create(code, discount, event_id) {
        return $api.post('promo-codes/', { code, discount, event_id });
    }

    static async get(id) {
        return $api.get(`promo-codes/${id}`);
    }

    static async getAll(eventId) {
        if (eventId) {
            return $api.get(`promo-codes/?eventId=${eventId}`);
        } else {
            return $api.get('promo-codes/');
        }
    }

    static async delete(id) {
        return $api.delete(`promo-codes/${id}`);
    }

    static async update(id, updatedFields, event_id) {
        const { code, discount } = updatedFields;
        return $api.put(`promo-codes/${id}`, {
            code,
            discount,
            event_id,
        });
    }
}
