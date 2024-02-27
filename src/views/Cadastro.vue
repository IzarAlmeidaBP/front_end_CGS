<template>
  <div class="container">
    <form id="cadatro-form">
      <label for="nome"></label>
      <input name="nome" type="text" placeholder="Nome" v-model="cliente.nome">

      <label for="email"></label>
      <input name="email" id="email" placeholder="Email" v-model="cliente.email">

      <button :disabled="!cliente.nome || !cliente.email" type="button" @click="adicionarCliente(cliente)">Cadastrar cliente</button>

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
            <i class="fa-solid fa-trash-can"></i>
            <i class="fa-solid fa-user-pen"></i>
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

function adicionarCliente(cliente) {
  lista.push(cliente)
  this.cliente = {
    nome: '',
    email: ''
  }
}

</script>
<style>
.izar {
  background-color: blue;
}
</style>
