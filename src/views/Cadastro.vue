<template>
  <main>
    A quantidade de itens na lista é:{{ list.length }}
    <label for="filtrar-tabela"></label>
    <input type="search" name="filtro" id="filtrar-tabela" placeholder="Digite o nome do cliente" />
    <table class="tabela-clientes">
      <thead>
        <tr class="cabeca-tabela">
          <th>ID</th>
          <th>Email</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr class="corpo-tabela" v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.nome }}</td>
          <td class="butoes">
            <button id="butao-editar" @click="editarCliente(index)">Editar</button>
            <button id="butao-excluir" @click="excluirCliente(item)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form action="">
      <input type="text" v-model="cliente.email" placeholder="Email">
      <input type="text" v-model="cliente.nome" placeholder="Nome">
      <button id="butao-adicionar" @click.prevent="adicionarNovoCliente(cliente)">Adicionar</button>
    </form>

  </main>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { adicionarCliente, deletarCliente, atualizarCliente, listarCliente } from '../api/clienteService';
import 'bootstrap/dist/css/bootstrap.css';
onMounted(async () => {
  await atualizarLista();
});

const campoPesquisa = ref('');

const cliente = ref({
  email: '',
  nome: ''
})


const list = reactive([]);

async function adicionarNovoCliente(novoCliente) {
  await adicionarCliente({ ...novoCliente });
  cliente.value.email = '';
  cliente.value.nome = '';
  atualizarLista();
}


async function atualizarLista() {
  const response = await listarCliente();
  list.splice(0, list.length);
  const listaCliente = await response.data;
  listaCliente.map((cliente) => {
    list.push(cliente)
  })
}
function editarCliente(index) {
  const novoEmail = prompt("Digite o novo email:")
  if (novoEmail !== null) {
    list[index].email = novoEmail
  }
  const novoNome = prompt("Digite o novo nome:")
  if (novoNome !== null) {
    list[index].nome = novoNome
  }
}

async function excluirCliente(cliente) {
  if (confirm("Tem certeza que deseja excluir este cliente?")) {
    const idCliente = cliente.id;
    await deletarCliente(idCliente)
    await atualizarLista();
  }
}
</script>
<style>
.tabela-clientes {
  width: 40%;
  border-collapse: collapse;
}

.cabeca-tabela th,
.corpo-tabela td {
  border: 1px solid #ccc;
  padding: 8px;
}

.cabeca-tabela {
  background-color: #f2f2f2;
}


#butao-editar,
#butao-excluir {
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

}

#butao-excluir {
  background-color: red;
}

#butao-editar {
  background-color: black;
  margin-right: 10px;
  margin-left: 10px;
}

#butao-editar:hover,
#butao-excluir:hover {
  filter: brightness(80%);
}

#butao-adicionar {
  background-color: blue;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#butao-adicionar:hover {
  background-color: darkblue;
}

#filtrar-tabela {
  width: 200px;
  height: 35px;
  padding: 5px;
  margin-bottom: 10px;
  display: block;
}
</style>
