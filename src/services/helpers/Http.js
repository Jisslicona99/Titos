
import Middleware from '../middleaware/Middleware';

class HTTP {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:8000/api';
    this.getAccessToken = new Middleware();
  } 
  async get(endpoint, token = false, params = null) {
    const headers = {
      ...(token && { 'Authorization': `Bearer ${this.getAccessToken.token}` }),
    }; 
    
    const url = `${this.baseUrl}/${endpoint}${params ? `?${new URLSearchParams(params).toString()}` : ''}`; 
    const response = await fetch(url, {
      method: 'GET',
      headers,
    }); 
    return response.json();
  }

  async post(endpoint, body, token = false, isFormData = false) {
    const headers = token ? { 'Authorization': `Bearer ${this.getAccessToken.token}` } : {};
 
    const requestBody = isFormData ? body : JSON.stringify(body);
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers,
      body: requestBody,
    });

    return  response.json();
  }

  async put(endpoint, body, token = false) {
    const headers = token ? { 'Authorization': `Bearer ${this.getAccessToken.token}` } : {};
    headers['Content-Type'] = 'application/json';

    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    return  response.json();
  }
  async patch(endpoint,body, token = false) {
    const headers = token ? { 'Authorization': `Bearer ${this.getAccessToken.token}` } : {}; 
    body.append('_method', 'PATCH'); 

    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers,
      body: body,
    });

    return  response.json();
  }
   
  async delete(endpoint, token = false) {
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${this.getAccessToken.token}`;
    }
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'DELETE',
      headers,
    });
    return  response.json(); 
  }
}

export default HTTP;