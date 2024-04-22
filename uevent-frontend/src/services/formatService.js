import $api from '../http';

export default class FormatService {
    static async getAll() {
        return $api.get('formats/');
    }
}
