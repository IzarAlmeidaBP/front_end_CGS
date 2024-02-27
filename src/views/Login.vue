<template>
  <div class="container">
    <div class="form-container">
      <form id="form-login" @submit.prevent="cadastrarCliente">
        <label class="nome-dados" for="email">Login:</label>
        <input type="text" id="email" name="email" v-model="cliente.email" required>

        <label class="nome-dados" for="senha">Senha:</label>
        <input type="password" id="senha" name="senha" v-model="cliente.senha" required>

        <button type="submit">Entrar</button>
      </form>
    </div>
    <button class="create-account-btn">Criar Conta</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cliente = ref({

  email: '',
  senha: ''
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.form-container {
  background-color: #f8f9fa;
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#form-login {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#entrada-dados {
  margin-bottom: 8px;
}

input[type='text'],
input[type='password'],
button {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}

input[type='text']:focus,
input[type='password']:focus {
  outline: none;
  border-color: #007bff;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.create-account-btn {
  background-color: transparent;
  border: none;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  margin-top: 20px;
}
</style>
