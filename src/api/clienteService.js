import api from './index.js';
const baseURL = 'http://localhost:8080/cliente';

export function adicionarCliente(cliente) {
  return api.post(baseURL, cliente);
}
export function deletarCliente(cliente) {
  return api.delete(baseURL, cliente);
}

export function atualizarCliente(cliente) {
  return api.put(baseURL, cliente);
}
export function listarCliente() {
  return api.get(baseURL);
}
