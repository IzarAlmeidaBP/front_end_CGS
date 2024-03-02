<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Editar Cliente</h2>

      <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="cliente.nome" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="cliente.email" required>
      </div>
      <div>
        <button @click="$emit('editarCliente', cliente);
        ">Enviar</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

onMounted(() => {
  cliente.value.id = props.clienteEdicao.id;
  cliente.value.email = props.clienteEdicao.email;
  cliente.value.nome = props.clienteEdicao.nome;
});
const cliente = ref({
  id: '',
  email: '',
  nome: ''
})
const props = defineProps({
  clienteEdicao: Object
})
const enviarDetalhes = () => {

  if (!nome.value || !email.value) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  emit('editarCliente', {});

  nome.value = '';
  email.value = '';
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
