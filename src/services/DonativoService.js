import HTTP from './helpers/Http';

class DonativoService {
    constructor() {
        this.http = new HTTP();
    }

    async getAll() {
        return this.http.get('donativos', true);
    }

    async getById(id) {
        return this.http.get(`donativos/${id}`, true);
    }

    async create(body) {
        return this.http.post('donativos', body, true);
    }

    async update(id, body) {
        return this.http.put(`donativos/${id}`, body, true);
    }

    async delete(id) {
        return this.http.delete(`donativos/${id}`, true);
    }
}

export default DonativoService; 