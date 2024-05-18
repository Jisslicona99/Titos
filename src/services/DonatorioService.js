import HTTP from './helpers/Http';

class DonatorioService {
    constructor() {
        this.http = new HTTP();
    }

    async getAll() {
        return this.http.get('donatorios', true);
    }

    async getById(id) {
        return this.http.get(`donatorios/${id}`, true);
    }

    async create(body) {
        return this.http.post('donatorios', body, true);
    }

    async update(id, body) {
        return this.http.put(`donatorios/${id}`, body, true);
    }

    async delete(id) {
        return this.http.delete(`donatorios/${id}`, true);
    }
}

export default DonatorioService;