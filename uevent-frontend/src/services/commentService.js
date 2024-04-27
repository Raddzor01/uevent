import $api from '../http';

export default class CommentService {
    static async create(content, user_id, event_id) {
        return $api.post('comments/', { content, user_id, event_id });
    }

    static async get(id) {
        return $api.get(`comments/${id}`);
    }

    static async getAll(eventId) {
        if (eventId) {
            return $api.get(`comments/?eventId=${eventId}`);
        } else {
            return $api.get('comments/');
        }
    }

    static async delete(id) {
        return $api.delete(`comments/${id}`);
    }

    static async update(id, content) {
        return $api.put(`comments/${id}`, {
            content,
        });
    }
}
