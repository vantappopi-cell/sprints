<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Video, User } from './types'
import PlayerModal from './components/PlayerModal.vue'
import AuthModal from './components/AuthModal.vue'
import UploadModal from './components/UploadModal.vue'

const API = 'http://48.102.249.95'

const videos = ref<Video[]>([])
const isLoading = ref(true)
const selectedVideo = ref<Video | null>(null)

const user = ref<User | null>(null)
const isAuthOpen = ref(false)
const isUploadOpen = ref(false)

function logout() {
  localStorage.removeItem('accessToken')
  user.value = null
}

onMounted(async () => {
  const response = await fetch(API + '/videos')
  videos.value = await response.json()
  isLoading.value = false

  const token = localStorage.getItem('accessToken')
  if (token) {
    const meResponse = await fetch(API + '/auth/me', { headers: { Authorization: 'Bearer ' + token } })
    if (meResponse.ok) {
      const meData = await meResponse.json()
      user.value = meData.user
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="top-0 z-40 bg-white px-6 py-3.5">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div @click="selectedVideo = null" class="flex items-center gap-3 cursor-pointer">
          <div class="w-8 h-5 rounded overflow-hidden flex flex-col border border-gray-200">
            <img src="./assets/Flag_of_Russia.svg.webp" alt="flag">
          </div>
          <h1 class="text-xl font-bold">RussTube</h1>
        </div>
        <div v-if="user" class="flex items-center gap-3">
          <span class="cursor-pointer text-sm font-medium flex gap-2 items-center text-gray-700 bg-gray-100 px-3 py-1.5 rounded-xl"> <img class="w-10 rounded-full" src="./assets/Flag_of_Russia.svg.webp" alt="flag">{{ user.name }}</span>
          <button @click="isUploadOpen = true" class="bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer">Загрузить</button>
          <button @click="logout" class="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-3.5 py-2 rounded-xl cursor-pointer">Выйти</button>
        </div>
        <button v-else @click="isAuthOpen = true" class="bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-semibold px-5 py-2 rounded-xl cursor-pointer">Воход / Регистрация</button>
      </div>
    </header>
    <PlayerModal v-if="selectedVideo" :video="selectedVideo" :videos="videos" @close="selectedVideo = null" @viewed="selectedVideo.views = $event" @select="selectedVideo = $event"/>
    <main v-else class="max-w-7xl mx-auto p-6">
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="animate-pulse bg-white border border-gray-200 rounded-2xl p-3">
          <div class="w-full aspect-video bg-gray-200 rounded-xl"></div>
          <div class="w-3/4 h-5 bg-gray-200 rounded mt-3"></div>
          <div class="w-1/2 h-4 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="video in videos" :key="video.id" @click="selectedVideo = video" class="bg-white border border-gray-200 rounded-2xl p-3 cursor-pointer">
          <img :src="API + '/uploads/' + video.preview" class="w-full aspect-video object-cover rounded-xl bg-black" />
          <div class="mt-3 px-1">
            <h3 class="font-semibold text-base text-gray-900 line-clamp-1">{{ video.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ video.author }} • {{ video.views }} просмотров</p>
          </div>
        </div>
      </div>
    </main>
    <AuthModal v-if="isAuthOpen" @close="isAuthOpen = false" @success="user = $event" />
    <UploadModal v-if="isUploadOpen" @close="isUploadOpen = false" @uploaded="videos.unshift($event)" />
  </div>
</template>
