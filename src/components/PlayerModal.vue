<script setup lang="ts">
import { onMounted } from 'vue'
import type { Video } from '../types'

const API = 'http://48.102.249.95'

const props = defineProps<{
  video: Video
}>()

const emit = defineEmits(['close', 'viewed'])

onMounted(async () => {
  const response = await fetch(API + '/videos/' + props.video.id + '/views', { method: 'POST' })
  const data = await response.json()
  emit('viewed', data.views)
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <button @click="emit('close')" class="mb-4 text-sm font-medium text-gray-600 cursor-pointer">Назад</button>
    <video :src="API + '/uploads/' + video.video" controls autoplay class="w-full aspect-video bg-black rounded-2xl"></video>
    <h2 class="text-xl font-bold mt-4">{{ video.title }}</h2>
    <p class="text-sm text-gray-500 mt-1">{{ video.author }}  {{ video.views }} просмотров</p>
    <div v-if="video.description" class="p-4 mt-4 text-sm text-gray-700">{{ video.description }}</div>
  </div>
</template>
