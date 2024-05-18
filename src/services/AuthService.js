import HTTP from './helpers/Http';

class AuthService {
    constructor() {
        this.http = new HTTP();
    }

    async login(body) {
        return this.http.post('login', body, true);
    }
    async me(body) {
        return this.http.post('me', body, true);
    }

    async getAll() {
        return this.http.get('usuarios', true);
    }

    async getById(id) {
        return this.http.get(`me/${id}`, true);
    }

    async create(body) {
        return this.http.post('register', body, true, true);
    }

    async update(id, body) { 
        return this.http.patch(`usuario/${id}`, body, true);
    }
    async delete(id) {
        return this.http.delete(`usuario/${id}`, true);
    }

}

export default AuthService;