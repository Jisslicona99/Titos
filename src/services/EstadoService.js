import HTTP from './helpers/Http';

class EstadoService {
    constructor() {
        this.http = new HTTP();
    }

    async getAll(id_donativo) {
        return this.http.get('estados', true, { id_donativo });
    }

    async getById(id) {
        return this.http.get(`estados/${id}`, true);
    }

    async create(body) {
        return this.http.post('estados', body, true,true);
    }

    async update(id, body) {
        return this.http.patch(`estados/${id}`, body, true);
    }

    async delete(id) {
        return this.http.delete(`estados/${id}`, true);
    }
}

export default EstadoService;