<template>
  <Teleport to="body">
    <div v-if="notifications.length" class="notification-container">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        class="notification"
        :class="notification.type"
      >
        <i :class="getIcon(notification.type)"></i>
        <span>{{ notification.message }}</span>
        <button @click="removeNotification(notification.id)" class="close-btn">×</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([])

const addNotification = (message, type = 'info', duration = 4000) => {
  const id = Date.now()
  notifications.value.push({ id, message, type })
  
  setTimeout(() => {
    removeNotification(id)
  }, duration)
}

const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

const getIcon = (type) => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  }
  return icons[type] || icons.info
}

defineExpose({ addNotification })
</script>

<style scoped>
</style>