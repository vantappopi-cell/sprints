<script setup lang="ts">
import { ref } from 'vue'

const API = 'http://48.102.249.95'
const emit = defineEmits(['close', 'success'])

const isRegister = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')

async function login() {
  const response = await fetch(API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  })
  const data = await response.json()

  localStorage.setItem('accessToken', data.accessToken)
  emit('success', data.user)
  emit('close')
}
async function register() {
  const response = await fetch(API + '/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.value, email: email.value, password: password.value })
  })
  const data = await response.json()

  localStorage.setItem('accessToken', data.accessToken)
  emit('success', data.user)
  emit('close')
}
</script>

<template>
  <div @click.self="emit('close')" class="fixed inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
    <div class="bg-white text-gray-900 p-7  w-full max-w-sm shadow-2xl border border-slate-100 flex flex-col gap-4">
      <div><h2 class="text-2xl font-bold tracking-tight">{{ isRegister ? 'Регистрация' : 'Вход' }}</h2></div>
      <div v-if="isRegister" class="flex flex-col gap-1.5">
        <label for="reg-name" class="font-medium text-gray-700">Имя</label>
        <input id="reg-name" v-model="name" type="text" placeholder="Ярик" class="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none"/>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="auth-email" class="text-sm font-medium text-gray-700">Email</label>
        <input id="auth-email" v-model="email" type="email" :placeholder="isRegister ? 'Lonyxx@mail.ru' : 'Lonyxxx@gmail.com '" class="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none"/>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="auth-password" class="text-sm font-medium text-gray-700">Пароль</label>
        <input id="auth-password" v-model="password" type="password" :placeholder="isRegister ? 'Минимум 6 символов' : '......'" class="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none"/>
      </div>
      <button @click="isRegister ? register() : login()" class="bg-gray-200 font-semibold py-2.5 rounded-xl shadow-sm cursor-pointer mt-1">{{ isRegister ? 'Зарегистрироваться' : 'Войти' }}</button>
      <button @click="isRegister = !isRegister" class="text-sm font-medium text-gray-600 cursor-pointer">{{ isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? ' }}<span class="text-gray-600">{{ isRegister ? 'Войти' : 'Регистрация' }}</span></button>
      <div class="border-t border-gray-100 pt-2">
        <button @click="emit('close')" class="w-full bg-gray-100 text-gray-700 text-sm font-medium py-2 rounded-xl cursor-pointer">Закрыть</button>
      </div>
    </div>
  </div>
</template>

