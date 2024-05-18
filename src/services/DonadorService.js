import HTTP from './helpers/Http';

class DonadorService {
    constructor() {
        this.http = new HTTP();
    }

    async getAll() {
        return this.http.get('donadores', true);
    }

    async getById(id) {
        return this.http.get(`donadores/${id}`, true);
    }

    async create(body) {
        return this.http.post('donadores', body, true);
    }

    async update(id, body) {
        return this.http.put(`donadores/${id}`, body, true);
    }

    async delete(id) {
        return this.http.delete(`donadores/${id}`, true);
    }
}

export default DonadorService;