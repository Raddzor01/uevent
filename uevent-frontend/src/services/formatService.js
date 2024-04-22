import $api from '../http';

export default class FormatService {
    static async getAll() {
        return $api.get('formats/');
    }
}

export const getFormat = (formatId, formats) => {
    const format = formats.find((format) => format.id === formatId);
    return format ? format.name : 'Without';
};
