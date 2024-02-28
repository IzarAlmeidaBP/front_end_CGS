<template>
  <div class="container">
    <form id="cadatro-form">
      <label for="nome"></label>
      <input name="nome" type="text" placeholder="Nome" v-model="cliente.nome">

      <label for="email"></label>
      <input name="email" id="email" placeholder="Email" v-model="cliente.email">

      <button :disabled="!cliente.nome || !cliente.email" type="button" @click="adicionarClienteLista(cliente)">Cadastrar cliente</button>

    </form>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in lista">
          <td>{{ lista.indexOf(cliente) }}</td>
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.email }}</td>
          <td>
            <button @click="atualizarCliente(cliente)">
              <i class="fa-solid fa-user-pen"></i> Editar
            </button>
            <button @click="deletarCliente(cliente)">
              <i class="fa-solid fa-trash-can"></i> Excluir
            </button>
          </td>

        </tr>
      </tbody>

    </table>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
const cliente = ref({
  nome: '',
  email: ''
})

//Lista reativa porque precisa atualizar em todos os lugares que ela aparece, ou para quem precisar dela;
const lista = reactive([]);

function adicionarClienteLista(cliente) {
  lista.push(cliente)
  this.cliente = {
    nome: '',
    email: ''
  }
}

function atualizarCliente(cliente) {

}
function deletarCliente(cliente) {
  const index = lista.indexOf(cliente);
  if (index !== -1) {
    lista.splice(index, 1);
  }
}



</script>
<style>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  padding: 5px 10px;
  transition: background-color 0.3s ease;
}

button i {
  margin-right: 5px;

}


button:hover {
  background-color: red;

}
</style>
