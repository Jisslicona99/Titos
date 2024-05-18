import HTTP from './helpers/Http';

class RolService {
    constructor() {
        this.http = new HTTP();
    }

    async getAll() {
        return this.http.get('roles', true);
    }

}

export default RolService;