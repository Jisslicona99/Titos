import HTTP from './helpers/Http';

class GrupoService {
  constructor() {
    this.http = new HTTP();
  }

  async getAll() {
    return this.http.get('grupos', true);
  }

  async getById(id) {
    return this.http.get(`grupos/${id}`, true);
  }

  async create(body) {
    return this.http.post('grupos', body, true);
  }

  async update(id, body) {
    return this.http.put(`grupos/${id}`, body, true);
  }

  async delete(id) {
    return this.http.delete(`grupos/${id}`, true);
  }
}

export default GrupoService;