<template>
  <main>
    <label for="filtrar-tabela"></label>
    <input type="search" name="filtro" id="filtrar-tabela" placeholder="Digite o nome do cliente" v-model="campoPesquisa" />
    <div class="tabela-clientes">
      <table>
        <thead>
          <tr class="cabeca-tabela">
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr class="corpo-tabela" v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.email }}</td>
            <td class="butoes">
              <button id="butao-editar" @click="passarDadosCliente(item)">Editar</button>
              <button id="butao-excluir" @click="excluirCliente(item)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <form action="" class="form-cliente">
      <input type="text" v-model="cliente.nome" placeholder="Nome" required>
      <input type="text" v-model="cliente.email" placeholder="Email" required>
      <button id="butao-adicionar" @click.prevent="adicionarNovoCliente(cliente)">Adicionar</button>
    </form>
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
  listaCliente.map((cliente) => {
    list.push(cliente)
  })
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

.tabela-clientes {
  display: flex;
  align-content: center;
  justify-content: center;

  width: 50%;
  border-collapse: collapse;
  margin: 0 auto;
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

.form-cliente {
  gap: 0.5rem;
  padding: 1rem;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
