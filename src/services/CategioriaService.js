import HTTP from './helpers/Http';

 class CategioriaService {
  constructor() {
    this.http = new HTTP();
  }

  async getAll() {
    return this.http.get('categorias', true);
  }

  async getById(id) {
    return this.http.get(`categorias/${id}`, true);
  }

  async create(body) {
    return this.http.post('categorias', body, true);
  }

  async update(id, body) {
    return this.http.put(`categorias/${id}`, body, true);
  }

  async delete(id) {
    return this.http.delete(`categorias/${id}`, true);
  }
}

export default CategioriaService;