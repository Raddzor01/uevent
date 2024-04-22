import $api from '../http';

export default class ThemeService {
    static async getAll() {
        return $api.get('themes/');
    }
}

export const getTheme = (themeId, themes) => {
    const theme = themes.find((theme) => theme.id === themeId);
    return theme ? theme.name : 'Without';
};
