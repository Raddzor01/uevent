import $api from '../http';

export default class ThemeService {
    static async getAll() {
        return $api.get('themes/');
    }
}
