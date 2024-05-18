import HTTP from './helpers/Http';

class ColeccionService {
    constructor() {
        this.http = new HTTP();
    }

    async getAll() {
        return this.http.get('colecciones', true);
    }

    async getById(id) {
        return this.http.get(`colecciones/${id}`, true);
    }

    async create(body) {
        return this.http.post('colecciones', body, true);
    }

    async update(id, body) {
        return this.http.put(`colecciones/${id}`, body, true);
    }

    async delete(id) {
        return this.http.delete(`colecciones/${id}`, true);
    }
}

export default ColeccionService;