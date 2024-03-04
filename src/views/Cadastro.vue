<template>
  <main class="container mt-4">
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="filtrar-tabela" class="visually-hidden">Pesquisar Cliente</label>
        <input type="search" class="form-control" id="filtrar-tabela" placeholder="Digite o nome do cliente" v-model="campoPesquisa">
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <button class="btn btn-primary me-2" @click="passarDadosCliente(item)">Editar</button>
                  <button class="btn btn-danger" @click="excluirCliente(item)">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <form class="row g-3" @submit.prevent="adicionarNovoCliente(cliente)">
          <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" v-model="cliente.nome" required>
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="cliente.email" required>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
    <ModalEditarCliente v-if="abrirModal" @editarCliente="editarCliente" :clienteEdicao="clienteEdicao" />
  </main>
</template>


<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { adicionarCliente, deletarCliente, atualizarCliente, listarCliente } from '../api/clienteService';
import 'bootstrap/dist/css/bootstrap.css';
import ModalEditarCliente from './ModalEditarCliente.vue';
onMounted(async () => {
  await atualizarLista();
});

const clienteEdicao = ref({
  id: '',
  email: '',
  nome: ''
})
const campoPesquisa = ref('');

const cliente = ref({
  email: '',
  nome: ''
})
const abrirModal = ref(false);


const list = reactive([]);

async function adicionarNovoCliente(novoCliente) {
  const emailExistente = list.some(cliente => cliente.email === novoCliente.email);

  if (emailExistente) {
    alert('Este email já está cadastrado.');
    return;
  }

  if (!novoCliente.nome || !novoCliente.email) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  await adicionarCliente({ ...novoCliente });
  cliente.value.email = '';
  cliente.value.nome = '';
  atualizarLista();
}


function filtrarClientes(filtro) {
  const listaFiltrada = list.filter((cliente) => {
    return cliente.nome.toUpperCase().startsWith(filtro.toUpperCase());
  });

  list.splice(0, list.length);

  listaFiltrada.forEach((cliente) => {
    list.push(cliente);
  });
}


async function atualizarLista() {
  const response = await listarCliente();
  list.splice(0, list.length);
  const listaCliente = await response.data;
  listaCliente.sort((a, b) => a.id - b.id);
  listaCliente.forEach((cliente) => {
    list.push(cliente);
  });
}


async function excluirCliente(cliente) {
  if (confirm("Tem certeza que deseja excluir este cliente?")) {
    const idCliente = cliente.id;
    await deletarCliente(idCliente)
    await atualizarLista();
  }
}
async function editarCliente(clienteModal) {
  try {
    await atualizarCliente(clienteModal);
    atualizarLista();
    abrirFecharModal();
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
  }

}
function passarDadosCliente(cliente) {
  clienteEdicao.value.id = cliente.id;
  clienteEdicao.value.email = cliente.email;
  clienteEdicao.value.nome = cliente.nome;
  abrirFecharModal()

}

const abrirFecharModal = () => {
  abrirModal.value = !abrirModal.value;
};

watch(
  () => campoPesquisa.value,
  (novoValor, valorAntigo) => {
    if (novoValor === '') {
      atualizarLista();
    } else {
      filtrarClientes(novoValor)
    }
  }
);
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background-color: #f0f0f0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.tabela-clientes {
  width: 100%;
  margin-bottom: 20px;
  overflow-x: auto;
}

.cabeca-tabela th,
.corpo-tabela td {
  border: 1px solid #ccc;
  padding: 8px;
}

.cabeca-tabela {
  background-color: #f2f2f2;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

.btn-danger {
  background-color: red;
}

.btn:hover {
  filter: brightness(80%);
}

#filtrar-tabela {
  width: 100%;
  max-width: 300px;
  height: 35px;
  padding: 5px;
  margin-bottom: 20px;
}

.form-cliente {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
</style>
