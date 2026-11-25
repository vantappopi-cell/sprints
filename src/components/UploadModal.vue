<script setup lang="ts">
import { ref } from 'vue'

const API = 'http://48.102.249.95'
const emit = defineEmits(['close', 'uploaded'])

const title = ref('')
const description = ref('')
const previewFile = ref<File | null>(null)
const videoFile = ref<File | null>(null)

function onPreviewChange(event: Event) {
  const input = event.target as HTMLInputElement
  previewFile.value = input.files?.item(0) || null
}

function onVideoChange(event: Event) {
  const input = event.target as HTMLInputElement
  videoFile.value = input.files?.item(0) || null
}

async function upload() {
  if (!title.value || !previewFile.value || !videoFile.value) {
    alert('Заполни название и выбери оба файла')
    return
  }

  const token = localStorage.getItem('accessToken')

  const previewForm = new FormData()
  previewForm.append('file', previewFile.value)
  const previewRes = await fetch(API + '/videos/preview', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
    body: previewForm
  })
  if (!previewRes.ok) {
    const err = await previewRes.json()
    alert('Ошибка обложки: ' + JSON.stringify(err))
    return
  }
  const previewData = await previewRes.json()

  const videoForm = new FormData()
  videoForm.append('file', videoFile.value)
  const videoRes = await fetch(API + '/videos/video', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
    body: videoForm
  })
  if (!videoRes.ok) {
    const err = await videoRes.json()
    alert('Ошибка видео: ' + JSON.stringify(err))
    return
  }
  const videoData = await videoRes.json()

  const createRes = await fetch(API + '/videos', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value || undefined,
      preview: previewData.preview,
      video: videoData.video
    })
  })
  if (!createRes.ok) {
    const err = await createRes.json()
    alert('Ошибка создания: ' + JSON.stringify(err))
    return
  }
  const newVideo = await createRes.json()

  emit('uploaded', newVideo)
  emit('close')
}
</script>

<template>
  <div @click.self="emit('close')" class="fixed inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
    <div class="bg-white text-gray-900 p-7 w-full max-w-md shadow-2xl border border-slate-100 flex flex-col gap-4">
      <div><h2 class="text-2xl font-bold">Загрузить видео</h2></div>
      <div class="flex flex-col gap-1.5">
        <label for="vid-title" class="text-sm font-medium text-gray-700">Название</label>
        <input id="vid-title" v-model="title" type="text" placeholder="Название ролика" class="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none"/>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="vid-desc" class="text-sm font-medium text-gray-700">Описание</label>
        <textarea id="vid-desc" v-model="description" placeholder="Необязательно" class="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none"></textarea>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="vid-preview" class="text-sm font-medium text-gray-700">Обложка</label>
        <input id="vid-preview" type="file" accept="image/*" @change="onPreviewChange" class="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none cursor-pointer"/>
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="vid-file" class="text-sm font-medium text-gray-700">Видеофайл</label>
        <input id="vid-file" type="file" accept="video/*" @change="onVideoChange" class="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-200 file:text-gray-700 cursor-pointer"/>
      </div>
      <button @click="upload" class="!bg-gray-200 font-semibold py-2.5 rounded-xl shadow-sm cursor-pointer mt-1">Опубликовать</button>
      <div class="border-t border-gray-100 pt-2">
        <button @click="emit('close')" class="w-full bg-gray-100 text-gray-700 text-sm font-medium py-2 rounded-xl cursor-pointer">Закрыть</button>
      </div>
    </div>
  </div>
</template>

