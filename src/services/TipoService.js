import HTTP from './helpers/Http';

class TipoService {
  constructor() {
    this.http = new HTTP();
  }

  async getAll() {
    return this.http.get('tipo-donantes', true);
  }
  async getEstado(estado) {
    return this.http.get('tipo-donantes', true, { estado });
  }

  async getById(id) {
    return this.http.get(`tipo-donantes/${id}`, true);
  }

  async create(body) {
    return this.http.post('tipo-donantes', body, true);
  }

  async update(id, body) {
    return this.http.put(`tipo-donantes/${id}`, body, true);
  }

  async delete(id) {
    return this.http.delete(`tipo-donantes/${id}`, true);
  }
}

export default TipoService;