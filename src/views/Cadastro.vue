<template>
  <main>
    <form action="">
      <input type="text" v-model="cliente.email" placeholder="Email">
      <input type="text" v-model="cliente.nome" placeholder="Nome">
      <button @click.prevent="adicionarCliente(cliente)">Adicionar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.email">
          <td>{{ item.email }}</td>
          <td>{{ item.nome }}</td>
          <td>
            <button @click="editarCliente(index)">Editar</button>
            <button @click="excluirCliente(index)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'

const cliente = ref({
  email: '',
  nome: ''
})

const list = reactive([]);

function adicionarCliente(novoCliente) {
  console.log(novoCliente)
  list.push({ ...novoCliente })
  cliente.value.email = ''
  cliente.value.nome = ''
}

function editarCliente(index) {
  const novoNome = prompt("Digite o novo nome:")
  if (novoNome !== null) {
    list[index].nome = novoNome
  }
  const novoEmail = prompt("Digite o novo email:")
  if (novoEmail !== null) {
    list[index].nome = novoEmail
  }
}

function excluirCliente(index) {
  if (confirm("Tem certeza que deseja excluir este cliente?")) {
    list.splice(index, 1)
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
